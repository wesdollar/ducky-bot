import { getNamesInChat } from "../../helpers/messages/get-names-in-chat/get-names-in-chat";
import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";

export function handleGetNamesInChat(
  message: string,
  usersInChatCache: string[],
  io: any
) {
  const usersInChat = getNamesInChat(message) as [];

  if (usersInChat && usersInChat.length) {
    addMessageToCache(
      usersInChat,
      usersInChatCache,
      ircResourceKeys.usersInChat,
      io
    );
  }
}
