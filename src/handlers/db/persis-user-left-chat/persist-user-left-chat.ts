import { prisma } from "../../../prisma";
import { handleErrors } from "../../handle-errors/handle-errors";
import { noCacheDataErrorMessage } from "../persis-user-chat-message/persist-user-chat-message";
import { type PersistedUserJoinedChatData } from "../persist-user-joined-chat/persist-user-joined-chat";

export const persisUserLeftChat = async (
  cacheData: PersistedUserJoinedChatData[]
) => {
  if (!cacheData.length) {
    return Error(noCacheDataErrorMessage);
  }

  for (const ircMessage of cacheData) {
    const { username, timestamp } = ircMessage;

    try {
      await prisma.user.upsert({
        where: { username },
        update: {
          lastSeen: new Date(timestamp),
          leftChat: {
            create: {
              timestamp: new Date(timestamp),
            },
          },
        },
        create: {
          username,
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
