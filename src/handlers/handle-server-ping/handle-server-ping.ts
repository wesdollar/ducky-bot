import type WebSocket from "ws";
import { formatMessageContent } from "../../helpers/cache/format-message-content/format-message-content";

export const handleServerPing = (message: string, ws: WebSocket) => {
  const formattedMessage = formatMessageContent(message);

  if (formattedMessage.includes("PING")) {
    console.log("\n\nhit includes statement of incoming ping\n\n");

    try {
      ws.send(`PONG ${formattedMessage.split(" ")[1]}`);
      console.log("responded to PING");
    } catch (error) {
      console.error(error);
    }
  }
};
