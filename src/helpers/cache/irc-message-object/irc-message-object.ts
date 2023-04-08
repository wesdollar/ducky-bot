import { ircResourceKeys } from "../../../constants/irc-resource-keys";
import { getTimestamp } from "../../dates/get-timestamp";
import { type ChatMessageObject } from "../../messages/get-chat-message/get-chat-message";
import type WebSocket from "ws";
import { formatMessageContent } from "../format-message-content/format-message-content";
import { UserJoinedChat } from "../add-message-to-cache/add-message-to-cache";

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
