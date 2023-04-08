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
    const { message, username, displayName, mod, subscriber } =
      ircMessage.message;
    const { timestamp } = ircMessage;

    try {
      await prisma.user.upsert({
        where: { username },
        update: {
          lastSeen: new Date(getTimestamp()),
          mod,
          subscriber,
          messages: {
            create: {
              message,
              timestamp: new Date(timestamp),
            },
          },
        },
        create: {
          username,
          displayName,
          mod,
          subscriber,
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
