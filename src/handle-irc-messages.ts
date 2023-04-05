import { ircCacheResourceKeys } from "./constants/irc-cache-keys";
import { twitchIrcCache } from "./twitch-irc-cache";
import { handleGetNamesInChat } from "./handlers/handle-get-names-in-chat/handle-get-names-in-chat";
import { handleGetChatMessages } from "./handlers/handle-get-chat-messages/handle-get-chat-messages";
import { handleGetUserJoinedChat } from "./handlers/handle-get-user-joined-chat/handle-get-user-joined-chat";
import { handleGetUserLeftChat } from "./handlers/handle-get-user-left-chat/handle-get-user-left-chat";

export function handleIrcMessages(message: string) {
  const userJoinedChatCache =
    (twitchIrcCache.get(ircCacheResourceKeys.userJoinedChat) as []) || [];

  const userLeftChatCache =
    (twitchIrcCache.get(ircCacheResourceKeys.userLeftChat) as []) || [];

  const userMessagesCache =
    (twitchIrcCache.get(ircCacheResourceKeys.chatMessages) as []) || [];

  const usersInChatCache =
    (twitchIrcCache.get(ircCacheResourceKeys.usersInChat) as []) || [];

  handleGetNamesInChat(message, usersInChatCache);
  handleGetChatMessages(message, userMessagesCache);
  handleGetUserJoinedChat(message, userJoinedChatCache);
  handleGetUserLeftChat(message, userLeftChatCache);

  return;
}
