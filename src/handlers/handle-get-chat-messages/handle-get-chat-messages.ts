import { getChatMessage } from "../../helpers/messages/get-chat-message/get-chat-message";
import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";

export function handleGetChatMessages(
  message: string,
  userMessagesCache: [],
  io: any
) {
  const chatMessage = getChatMessage(message);

  if (chatMessage && Object.keys(chatMessage).length) {
    addMessageToCache(
      chatMessage,
      userMessagesCache,
      ircResourceKeys.chatMessages,
      io
    );
  }
}
