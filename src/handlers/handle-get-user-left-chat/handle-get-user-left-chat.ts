import { getUserLeftChat } from "../../helpers/messages/get-user-left-chat/get-user-left-chat";
import { ircResourceKeys } from "../../constants/irc-resource-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";

export function handleGetUserLeftChat(
  message: string,
  userLeftChatCache: [],
  io: any
) {
  const userLeftChat = getUserLeftChat(message);

  if (userLeftChat) {
    addMessageToCache(
      userLeftChat,
      userLeftChatCache,
      ircResourceKeys.userLeftChat,
      io
    );
  }
}
