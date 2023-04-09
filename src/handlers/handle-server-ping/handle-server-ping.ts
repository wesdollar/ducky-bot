import type WebSocket from "ws";
import { formatMessageContent } from "../../helpers/cache/format-message-content/format-message-content";

export const handleServerPing = (message: WebSocket.Data, ws: WebSocket) => {
  const formattedMessage = formatMessageContent(message);

  if (formattedMessage.includes("PING")) {
    try {
      ws.send(`PONG ${formattedMessage.split(" ")[1]}`);
      console.log("responded to PING");
    } catch (error) {
      console.error(error);
    }
  }
};
