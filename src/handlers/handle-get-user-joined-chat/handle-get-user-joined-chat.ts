import { getUserJoinedChat } from "../../helpers/messages/get-user-joined-chat/get-user-joined-chat";
import { ircCacheResourceKeys } from "../../constants/irc-cache-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";

export function handleGetUserJoinedChat(
  message: string,
  userJoinedChatCache: []
) {
  const userJoinedChat = getUserJoinedChat(message);

  if (userJoinedChat) {
    addMessageToCache(
      userJoinedChat,
      userJoinedChatCache,
      ircCacheResourceKeys.userJoinedChat
    );
  }
}
