import { getChatMessage } from "../../helpers/messages/get-chat-message/get-chat-message";
import { ircResourceKeys } from "../../constants/irc-resource-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { formatMessageContent } from "../../helpers/cache/format-message-content/format-message-content";

export function handleGetChatMessages(
  message: string,
  userMessagesCache: [],
  io: any
) {
  console.log("message hit ", formatMessageContent(message));

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
