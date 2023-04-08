import type WebSocket from "ws";

export const handleServerPing = (message: string, ws: WebSocket) => {
  if (message.includes("PING")) {
    console.log("incoming ping");

    try {
      ws.send(`PONG ${message.split(" ")[1]}`);
      console.log("responded to PING");
    } catch (error) {
      console.error(error);
    }
  }
};
