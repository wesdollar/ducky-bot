import { logMessageContent } from "../../log-formatters/log-message-content";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";
import type WebSocket from "ws";
import { type ChatMessageObject } from "@dollardojo/modules/types/chat/chat-message-object";

interface MessageObjectWithString {
  data: string;
  type: string;
}

interface MessageObjectWithBuffer {
  data: Buffer;
  type: string;
}

export const formatMessageContent = (
  data:
    | MessageObjectWithString
    | MessageObjectWithBuffer
    | ArrayBuffer
    | WebSocket.Data
    | ChatMessageObject
) => {
  let message = "";

  if (typeof data === "string") {
    message = data;

    return message;
  }

  if (Buffer.isBuffer(data)) {
    message = data.toString("utf-8");

    return message;
  }

  if (Array.isArray(data) && data.length) {
    // TODO: use error handler
    console.error("provided message is an array, which is not supported");

    return "";
  }

  if (typeof data === "object") {
    const localMessage = data;
    let typedMessage;

    if ("type" in localMessage && localMessage.type === "string") {
      typedMessage = localMessage as MessageObjectWithString;
      message = typedMessage.data;

      return message;
    }

    const typedData = data as MessageObjectWithBuffer;
    const localBufferMessage = typedData.data;

    if (Buffer.isBuffer(localBufferMessage)) {
      message = localBufferMessage.toString("utf-8");

      return message;
    }
  }

  logIncomingMessageTitle(`format message content error`);
  logMessageContent(`data is of type ${typeof data} and could not be matched`);

  return "";
};
