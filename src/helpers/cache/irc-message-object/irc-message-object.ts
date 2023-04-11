import { ircResourceKeys } from "@dollardojo/modules/dist/constants/irc-resource-keys";
import { type ChatMessageObject } from "@dollardojo/modules/dist/types/chat/chat-message-object";
import type WebSocket from "ws";
import { formatMessageContent } from "../format-message-content/format-message-content";
import { type UserJoinedChat } from "@dollardojo/modules/dist/types/chat/user-joined-chat";
import { getTimestamp } from "@dollardojo/modules/dist/helpers/get-timestamp/get-timestamp";
import type {
  ResponseChatMessageObject,
  ResponseUserJoinedObject,
  ResponseUserLeftObject,
  ResponseUsersInChatObject,
  GenericChatResponseObject,
} from "@dollardojo/modules/dist/types/irc-messages/irc-message-object";

// data was previously WebSocket.Data
export const ircMessageObject = (
  data:
    | WebSocket.Data
    | ArrayBuffer
    | string[]
    | ChatMessageObject
    | UserJoinedChat,
  ircResourceKey: string
):
  | ResponseChatMessageObject
  | ResponseUserJoinedObject
  | ResponseUserLeftObject
  | ResponseUsersInChatObject
  | GenericChatResponseObject => {
  let localData;

  switch (ircResourceKey) {
    case ircResourceKeys.chatMessages:
      return {
        message: data,
        timestamp: getTimestamp(),
      } as ResponseChatMessageObject;
    case ircResourceKeys.userJoinedChat:
      localData = data as unknown as UserJoinedChat;

      return {
        username: localData.username,
        lastSeen: localData.lastSeen,
        subscriber: localData.subscriber,
        mod: localData.mod,
        timestamp: getTimestamp(),
      } as ResponseUserJoinedObject;
    case ircResourceKeys.userLeftChat:
      return {
        user: data,
        timestamp: getTimestamp(),
      } as ResponseUserLeftObject;
    case ircResourceKeys.usersInChat:
      return {
        users: data,
        timestamp: getTimestamp(),
      } as ResponseUsersInChatObject;
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
