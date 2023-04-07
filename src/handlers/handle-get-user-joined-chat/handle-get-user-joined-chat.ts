import { getUserJoinedChat } from "../../helpers/messages/get-user-joined-chat/get-user-joined-chat";
import { ircResourceKeys } from "../../constants/irc-resource-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";

export function handleGetUserJoinedChat(
  message: string,
  userJoinedChatCache: [],
  io: any
) {
  const userJoinedChat = getUserJoinedChat(message);

  if (userJoinedChat) {
    addMessageToCache(
      userJoinedChat,
      userJoinedChatCache,
      ircResourceKeys.userJoinedChat,
      io
    );
  }
}
