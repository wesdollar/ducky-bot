import { getUserJoinedChat } from "../../helpers/messages/get-user-joined-chat/get-user-joined-chat";
import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { prisma } from "../../prisma";

export const handleGetUserJoinedChat = async (
  message: string,
  userJoinedChatCache: [],
  io: any
) => {
  const user = getUserJoinedChat(message);

  if (user) {
    const userObject = {
      username: user,
      subscriber: false,
      mod: false,
      lastSeen: null as Date | null,
    };

    let existingUser;

    try {
      existingUser = await prisma.user.findFirst({
        where: {
          username: user,
        },
      });

      userObject.subscriber = existingUser?.subscriber || false;
      userObject.mod = existingUser?.mod || false;
      userObject.lastSeen = existingUser?.lastSeen || null;
    } catch (error) {}

    addMessageToCache(
      userObject,
      userJoinedChatCache,
      ircResourceKeys.userJoinedChat,
      io
    );
  }
};
