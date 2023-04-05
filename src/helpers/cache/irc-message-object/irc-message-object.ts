// import type WebSocket from "ws";
import { getTimestamp } from "../../dates/get-timestamp";
import { type ChatMessageObject } from "../../messages/get-chat-message/get-chat-message";
import { formatMessageContent } from "../format-message-content/format-message-content";
import type WebSocket from "ws";

// data was previously WebSocket.Data
export const ircMessageObject = (
  data:
    | WebSocket.Data
    | string
    | Buffer
    | ArrayBuffer
    | string[]
    | ChatMessageObject
): any => {
  return {
    message: formatMessageContent(data),
    timestamp: getTimestamp(),
  };
};
