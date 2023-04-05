import { getUserLeftChat } from "../../helpers/messages/get-user-left-chat/get-user-left-chat";
import { ircCacheResourceKeys } from "../../constants/irc-cache-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";

export function handleGetUserLeftChat(message: string, userLeftChatCache: []) {
  const userLeftChat = getUserLeftChat(message);

  if (userLeftChat) {
    addMessageToCache(
      userLeftChat,
      userLeftChatCache,
      ircCacheResourceKeys.userLeftChat
    );
  }
}
