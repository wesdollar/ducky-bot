import { getChatMessage } from "../../helpers/messages/get-chat-message/get-chat-message";
import { ircCacheResourceKeys } from "../../constants/irc-cache-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";

export function handleGetChatMessages(message: string, userMessagesCache: []) {
  const chatMessage = getChatMessage(message);

  if (chatMessage && Object.keys(chatMessage).length) {
    addMessageToCache(
      chatMessage,
      userMessagesCache,
      ircCacheResourceKeys.chatMessages
    );
  }
}
