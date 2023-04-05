import { getNamesInChat } from "./helpers/messages/get-names-in-chat/get-names-in-chat";
import { getChatMessage } from "./helpers/messages/get-chat-message/get-chat-message";
import { getUserJoinedChat } from "./helpers/messages/get-user-joined-chat/get-user-joined-chat";
import { getUserLeftChat } from "./helpers/messages/get-user-left-chat/get-user-left-chat";
import { ircCacheResourceKeys } from "./constants/irc-cache-keys";
import { addMessageToCache } from "./helpers/cache/add-message-to-cache/add-message-to-cache";
import { twitchIrcCache } from "./twitch-irc-cache";
import { featureFlags } from "./constants/feature-flags";

export function handleIrcMessages(message: string) {
  const userJoinedChatCache =
    (twitchIrcCache.get(ircCacheResourceKeys.userJoinedChat) as []) || [];

  const userLeftChatCache =
    (twitchIrcCache.get(ircCacheResourceKeys.userLeftChat) as []) || [];

  const userMessagesCache =
    (twitchIrcCache.get(ircCacheResourceKeys.chatMessages) as []) || [];

  const usersInChatCache =
    (twitchIrcCache.get(ircCacheResourceKeys.usersInChat) as []) || [];

  const usersInChat = getNamesInChat(message) as [];

  if (featureFlags.enableGetAllUsers && usersInChat && usersInChat.length) {
    addMessageToCache(
      usersInChat,
      usersInChatCache,
      twitchIrcCache,
      ircCacheResourceKeys.usersInChat
    );
  }

  const chatMessage = getChatMessage(message);

  if (chatMessage && Object.keys(chatMessage).length) {
    addMessageToCache(
      chatMessage,
      userMessagesCache,
      twitchIrcCache,
      ircCacheResourceKeys.chatMessages
    );
  }

  const userJoinedChat = getUserJoinedChat(message);

  if (userJoinedChat) {
    addMessageToCache(
      userJoinedChat,
      userJoinedChatCache,
      twitchIrcCache,
      ircCacheResourceKeys.userJoinedChat
    );
  }

  const userLeftChat = getUserLeftChat(message);

  if (userLeftChat) {
    addMessageToCache(
      userLeftChat,
      userLeftChatCache,
      twitchIrcCache,
      ircCacheResourceKeys.userLeftChat
    );
  }

  return;
}
