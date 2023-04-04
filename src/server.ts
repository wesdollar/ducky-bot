import express from "express";
import WebSocket from "ws";
import * as dotenv from "dotenv";
import axios from "axios";
import { getNamesInChat } from "./helpers/messages/get-names-in-chat";
import { getChatMessage } from "./helpers/messages/get-chat-message";
import { getUserJoinedChat } from "./helpers/messages/get-user-joined-chat";
import { getUserLeftChat } from "./helpers/messages/get-user-left-chat";

dotenv.config();

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const ws = new WebSocket("ws://irc-ws.chat.twitch.tv:80");

console.log("Connecting to Twitch IRC...");

ws.on("connectFailed", function (error) {
  console.log(`Connect Error: ${error.toString()}`);
});

ws.on("open", function (connection) {
  console.log("WebSocket Client Connected");

  ws.send("CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands");
  ws.send(`PASS oauth:${process.env.DUCKY_BOT_ACCESS_TOKEN}`);
  ws.send(`NICK ${process.env.TWITCH_USER_NAME}`);
  ws.send("JOIN #dollardojo");
});

ws.on("message", function (data: WebSocket.Data) {
  let message = data;

  if (Buffer.isBuffer(data)) {
    message = data.toString("utf8");

    getNamesInChat(message);
    getChatMessage(message);
    getUserJoinedChat(message);
    getUserLeftChat(message);
  }

  if (typeof data === "string") {
    getNamesInChat(message);
    getChatMessage(message);
    getUserJoinedChat(message);
    getUserLeftChat(message);
  }
});
