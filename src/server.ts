import express from "express";
import WebSocket from "ws";
import * as dotenv from "dotenv-flow";
import axios from "axios";
import { ircResourceKeys } from "./constants/irc-resource-keys";
import { errorResponse } from "./responses/error-response";
import { httpStatusCodes } from "./constants/http-status-codes";
import { errorKeys } from "./constants/error-keys";
import { ircMessageObject } from "./helpers/cache/irc-message-object/irc-message-object";
import { formatMessageContent } from "./helpers/cache/format-message-content/format-message-content";
import { handleIrcMessages } from "./handle-irc-messages";
import type NodeCache from "node-cache";
import { twitchIrcCache } from "./twitch-irc-cache";
import { persistUserChatMessage } from "./handlers/db/persis-user-chat-message/persist-user-chat-message";
import { persistUserJoinedChat } from "./handlers/db/persist-user-joined-chat/persist-user-joined-chat";
import { persistUserLeftChat } from "./handlers/db/persis-user-left-chat/persist-user-left-chat";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  SocketData,
  InterServerEvents,
  ServerToClientEvents,
} from "./types/socket-io";
import { persistIrcMessageLog } from "./handlers/db/persist-irc-message-log/persist-irc-message-log";
import { handleServerPing } from "./handlers/handle-server-ping/handle-server-ping";

dotenv.config();

const incomingIrcMessageLogCache = [] as NodeCache[];
const app = express();
const httpServer = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const port = 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/validate", async (req, res) => {
  try {
    const response = await axios.get("https://id.twitch.tv/oauth2/validate", {
      headers: {
        Authorization: `OAuth ${process.env.DUCKY_BOT_ACCESS_TOKEN}`,
      },
    });

    return res.json({ success: "true", response });
  } catch (error) {
    return res.json({ success: "false", error });
  }
});

app.get("/access-token", (req, res) => {
  return res.redirect(
    `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${process.env.DUCKYDOJO_BOT_CLIENT_ID}&redirect_uri=${process.env.DUCKY_BOT_REDIRECT_URI}&scope=chat%3Aread+chat%3Aedit+user%3Aread%3Asubscriptions+user%3Aread%3Aemail`
  );
});

app.get("/ducky-cb", (req, res) => {
  return res.json({ success: "true" });
});

app.get("/twitch-irc-cache/:resourceKey", (req, res) => {
  const { resourceKey: requestedResource } = req.params;
  const cacheData = twitchIrcCache.get(requestedResource);

  if (cacheData === undefined) {
    return res.json(
      errorResponse(
        httpStatusCodes.noContent,
        `no items in cache for key ${requestedResource}`,
        { key: errorKeys.noItemsInCache, errorStack: {} }
      )
    );
  }

  return res.json(cacheData);
});

export interface IrcUserMessage {
  message: {
    message: string;
    user: string;
  };
  timestamp: string;
}

app.get("/cron-jobs/persist-to-db/:resourceKey", (req, res) => {
  const { resourceKey: requestedResource } = req.params;
  let cacheData = twitchIrcCache.get(requestedResource) as [] | undefined;

  if (cacheData === undefined) {
    return res.json(
      errorResponse(
        httpStatusCodes.noContent,
        `no items in cache for key ${requestedResource}`,
        { key: errorKeys.noItemsInCache, errorStack: {} }
      )
    );
  }

  switch (requestedResource) {
    case ircResourceKeys.chatMessages:
      try {
        persistUserChatMessage(cacheData);
        twitchIrcCache.del(ircResourceKeys.chatMessages);
      } catch (error) {
        return res.json({ success: false, error });
      }
      break;
    case ircResourceKeys.userJoinedChat:
      try {
        persistUserJoinedChat(cacheData);
        twitchIrcCache.del(ircResourceKeys.userJoinedChat);
      } catch (error) {
        return res.json({ success: false, error });
      }
      break;
    case ircResourceKeys.userLeftChat:
      try {
        persistUserLeftChat(cacheData);
        twitchIrcCache.del(ircResourceKeys.userLeftChat);
      } catch (error) {
        return res.json({ success: false, error });
      }
      break;
    default:
      cacheData = undefined;
      break;
  }

  if (!cacheData) {
    return res.json({ success: false });
  }

  return res.json({ success: true });
});

const ws = new WebSocket("ws://irc-ws.chat.twitch.tv:80");

console.log("Connecting to Twitch IRC...");

ws.on("connectFailed", function (error) {
  console.log(`Connect Error: ${error.toString()}`);
});

ws.on("open", () => {
  console.log("WebSocket Client Connected");

  ws.send("CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands");
  ws.send(`PASS oauth:${process.env.DUCKY_BOT_ACCESS_TOKEN}`);
  ws.send(`NICK ${process.env.TWITCH_USER_NAME}`);
  ws.send("JOIN #dollardojo");
});

ws.on("message", function (data: WebSocket.Data) {
  let message = "";

  const ircMessage = ircMessageObject(data, ircResourceKeys.ircMessages);

  incomingIrcMessageLogCache.push(ircMessage);
  persistIrcMessageLog(ircMessage);

  handleServerPing(message, ws);

  try {
    twitchIrcCache.set(ircResourceKeys.ircMessages, incomingIrcMessageLogCache);
  } catch (error) {
    console.log(`failed to save ${ircResourceKeys.ircMessages} to cache`);
  }

  if (Buffer.isBuffer(data)) {
    message = formatMessageContent(data.toString("utf8"));

    handleIrcMessages(message, io);

    return;
  }

  if (typeof data === "string") {
    message = formatMessageContent(data);

    handleIrcMessages(message, io);

    return;
  }

  if (typeof message === "object") {
    console.log("object");
    console.log("data is of type object");
  }
});

io.on("connection", (socket) => {
  socket.on("hello", () => {
    io.sockets.emit(
      "helloAck",
      "Welcome to DuckyBot! I'll be your host, Ducky!"
    );
  });
});

httpServer.listen(port);
