import { ircResourceKeys } from "../../../constants/irc-resource-keys";
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
    case ircResourceKeys.chatMessages:
      return {
        message: data,
        timestamp: getTimestamp(),
      };
    case ircResourceKeys.userJoinedChat:
      return {
        user: data,
        timestamp: getTimestamp(),
      };
    case ircResourceKeys.userLeftChat:
      return {
        user: data,
        timestamp: getTimestamp(),
      };
    case ircResourceKeys.usersInChat:
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
