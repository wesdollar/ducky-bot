import { prisma } from "../../../prisma";
import { handleErrors } from "../../handle-errors/handle-errors";
import { noCacheDataErrorMessage } from "../persis-user-chat-message/persist-user-chat-message";

export interface PersistedUserJoinedChatData {
  user: string;
  timestamp: string;
}

export const persistUserJoinedChat = async (
  cacheData: PersistedUserJoinedChatData[]
) => {
  if (!cacheData.length) {
    return Error(noCacheDataErrorMessage);
  }

  for (const ircMessage of cacheData) {
    const { user: chatUser, timestamp } = ircMessage;

    try {
      await prisma.user.upsert({
        where: { username: chatUser },
        update: {
          lastSeen: new Date(timestamp),
          joinedChat: {
            create: {
              timestamp: new Date(timestamp),
            },
          },
        },
        create: {
          username: chatUser,
          joinedChat: {
            create: {
              timestamp: new Date(timestamp),
            },
          },
        },
      });
    } catch (error) {
      handleErrors(error, "prisma upsert for new chat message failed");

      return Error("persist user joined chat failed");
    }
  }
};
