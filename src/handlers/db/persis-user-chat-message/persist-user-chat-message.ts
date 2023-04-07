import { getTimestamp } from "../../../helpers/dates/get-timestamp";
import { handleErrors } from "../../handle-errors/handle-errors";
import { prisma } from "../../../prisma";
import { type ChatMessageObject } from "../../../helpers/messages/get-chat-message/get-chat-message";

export interface PersistedChatMessageCacheData {
  message: ChatMessageObject;
  timestamp: string;
}

export const noCacheDataErrorMessage = "no cache data provided";

export const persistUserChatMessage = async (
  cacheData: PersistedChatMessageCacheData[]
) => {
  if (!cacheData.length) {
    return Error(noCacheDataErrorMessage);
  }

  for (const ircMessage of cacheData) {
    const { message, user } = ircMessage.message;
    const { timestamp } = ircMessage;

    try {
      await prisma.user.upsert({
        where: { username: user },
        update: {
          lastSeen: new Date(getTimestamp()),
          messages: {
            create: {
              message,
              timestamp: new Date(timestamp),
            },
          },
        },
        create: {
          username: user,
          messages: {
            create: {
              message,
              timestamp: new Date(timestamp),
            },
          },
        },
      });
    } catch (error) {
      handleErrors(error, "prisma upsert for new chat message failed");

      return Error("persist user chat message failed");
    }
  }
};
