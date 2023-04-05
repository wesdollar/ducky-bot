import { getNamesInChat } from "../../helpers/messages/get-names-in-chat/get-names-in-chat";
import { ircCacheResourceKeys } from "../../constants/irc-cache-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { featureFlags } from "../../constants/feature-flags";

export function handleGetNamesInChat(
  message: string,
  usersInChatCache: string[]
) {
  const usersInChat = getNamesInChat(message) as [];

  console.log(featureFlags.enableGetAllUsers, usersInChat);

  if (featureFlags.enableGetAllUsers && usersInChat && usersInChat.length) {
    addMessageToCache(
      usersInChat,
      usersInChatCache,
      ircCacheResourceKeys.usersInChat
    );
  }
}
