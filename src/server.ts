import express from "express";
import WebSocket from "ws";
import * as dotenv from "dotenv-flow";
import axios from "axios";
import { log } from "console";
import { ircCacheResourceKeys } from "./constants/irc-cache-keys";
import { errorResponse } from "./responses/error-response";
import { httpStatusCodes } from "./constants/http-status-codes";
import { errorKeys } from "./constants/error-keys";
import { ircMessageObject } from "./helpers/cache/irc-message-object/irc-message-object";
import { formatMessageContent } from "./helpers/cache/format-message-content/format-message-content";
import { handleIrcMessages } from "./handle-irc-messages";
import type NodeCache from "node-cache";
import { twitchIrcCache } from "./twitch-irc-cache";

dotenv.config();

const incomingIrcMessageLogCache = [] as NodeCache[];

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
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

  incomingIrcMessageLogCache.push(
    ircMessageObject(data, ircCacheResourceKeys.ircMessages)
  );

  try {
    twitchIrcCache.set(
      ircCacheResourceKeys.ircMessages,
      incomingIrcMessageLogCache
    );
  } catch (error) {
    log(`failed to save ${ircCacheResourceKeys.ircMessages} to cache`);
  }

  if (Buffer.isBuffer(data)) {
    message = formatMessageContent(data.toString("utf8"));

    handleIrcMessages(message);

    return;
  }

  if (typeof data === "string") {
    message = formatMessageContent(data);

    handleIrcMessages(message);

    return;
  }

  if (typeof message === "object") {
    console.log("object");
    console.log("data is of type object");
  }
});
