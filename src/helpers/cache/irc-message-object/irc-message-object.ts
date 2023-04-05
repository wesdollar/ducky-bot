// import type WebSocket from "ws";
import { ircCacheResourceKeys } from "../../../constants/irc-cache-keys";
import { getTimestamp } from "../../dates/get-timestamp";
import { type ChatMessageObject } from "../../messages/get-chat-message/get-chat-message";
import type WebSocket from "ws";

// data was previously WebSocket.Data
export const ircMessageObject = (
  data:
    | WebSocket.Data
    | string
    | Buffer
    | ArrayBuffer
    | string[]
    | ChatMessageObject,
  ircResourceKey: string
): any => {
  switch (ircResourceKey) {
    case ircCacheResourceKeys.chatMessages:
      return {
        message: data,
        timestamp: getTimestamp(),
      };
    case ircCacheResourceKeys.userJoinedChat:
      return {
        user: data,
        timestamp: getTimestamp(),
      };
    case ircCacheResourceKeys.userLeftChat:
      return {
        user: data,
        timestamp: getTimestamp(),
      };
    case ircCacheResourceKeys.usersInChat:
      return {
        users: data,
        timestamp: getTimestamp(),
      };
    default:
      return {
        message: data,
        timestamp: getTimestamp(),
      };
  }
};
