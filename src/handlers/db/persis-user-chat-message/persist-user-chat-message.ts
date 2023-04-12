import { getTimestamp } from "@dollardojo/modules/helpers/get-timestamp/get-timestamp";
import { handleErrors } from "../../handle-errors/handle-errors";
import { prisma } from "../../../prisma";
import { type PersistedChatMessageCacheData } from "@dollardojo/modules/types/chat/persisted-chat-message-cache-data";

export const noCacheDataErrorMessage = "no cache data provided";

export const persistUserChatMessage = async (
  cacheData: PersistedChatMessageCacheData[]
) => {
  if (!cacheData.length) {
    return Error(noCacheDataErrorMessage);
  }

  let retryAttempt = 0;

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

      if (retryAttempt < 6) {
        console.log(`retrying persist new chat message`);
        persistUserChatMessage(cacheData);
        retryAttempt = retryAttempt++;
      }

      return Error(`retry attempts on chat message persist failed`);
    }
  }
};
