import { prisma } from "../../../prisma";
import { handleErrors } from "../../handle-errors/handle-errors";
import { noCacheDataErrorMessage } from "../persis-user-chat-message/persist-user-chat-message";

interface PersisUserLeftChatData {
  user: string;
  timestamp: Date;
}

export const persistUserLeftChat = async (
  cacheData: PersisUserLeftChatData[]
) => {
  if (!cacheData.length) {
    return Error(noCacheDataErrorMessage);
  }

  for (const ircMessage of cacheData) {
    const { user, timestamp } = ircMessage;

    try {
      await prisma.user.upsert({
        where: { username: user },
        update: {
          lastSeen: new Date(timestamp),
          leftChat: {
            create: {
              timestamp: new Date(timestamp),
            },
          },
        },
        create: {
          username: user,
          lastSeen: new Date(timestamp),
          leftChat: {
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
