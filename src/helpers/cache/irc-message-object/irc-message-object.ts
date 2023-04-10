import { ircResourceKeys } from "@dollardojo/modules/dist/constants/irc-resource-keys";
import { getTimestamp } from "../../dates/get-timestamp";
import { type ChatMessageObject } from "@dollardojo/modules/dist/types/chat/chat-message-object";
import type WebSocket from "ws";
import { formatMessageContent } from "../format-message-content/format-message-content";
import { type UserJoinedChat } from "@dollardojo/modules/dist/types/chat/user-joined-chat";

// data was previously WebSocket.Data
export const ircMessageObject = (
  data:
    | WebSocket.Data
    | string
    | Buffer
    | ArrayBuffer
    | string[]
    | ChatMessageObject
    | UserJoinedChat,
  ircResourceKey: string
): any => {
  let localData;

  switch (ircResourceKey) {
    case ircResourceKeys.chatMessages:
      return {
        message: data,
        timestamp: getTimestamp(),
      };
    case ircResourceKeys.userJoinedChat:
      localData = data as unknown as UserJoinedChat;

      return {
        username: localData.username,
        lastSeen: localData.lastSeen,
        subscriber: localData.subscriber,
        mod: localData.mod,
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
    case ircResourceKeys.ircMessages:
      return {
        message: formatMessageContent(data as any),
        timestamp: getTimestamp(),
      };
    default:
      return {
        message: data,
        timestamp: getTimestamp(),
      };
  }
};
