import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";
import { twitchIrcCache } from "./twitch-irc-cache";
import { handleGetNamesInChat } from "./handlers/handle-get-names-in-chat/handle-get-names-in-chat";
import { handleGetChatMessages } from "./handlers/handle-get-chat-messages/handle-get-chat-messages";
import { handleGetUserJoinedChat } from "./handlers/handle-get-user-joined-chat/handle-get-user-joined-chat";
import { handleGetUserLeftChat } from "./handlers/handle-get-user-left-chat/handle-get-user-left-chat";

export function handleIrcMessages(message: string, io: any) {
  const userJoinedChatCache =
    (twitchIrcCache.get(ircResourceKeys.userJoinedChat) as []) || [];

  const userLeftChatCache =
    (twitchIrcCache.get(ircResourceKeys.userLeftChat) as []) || [];

  const userMessagesCache =
    (twitchIrcCache.get(ircResourceKeys.chatMessages) as []) || [];

  const usersInChatCache =
    (twitchIrcCache.get(ircResourceKeys.usersInChat) as []) || [];

  handleGetNamesInChat(message, usersInChatCache, io);
  handleGetChatMessages(message, userMessagesCache, io);
  handleGetUserJoinedChat(message, userJoinedChatCache, io);
  handleGetUserLeftChat(message, userLeftChatCache, io);

  return;
}
