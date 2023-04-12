import { ircMessageObject } from "../irc-message-object/irc-message-object";
import { type ChatMessageObject } from "@dollardojo/modules/types/chat/chat-message-object";
import { twitchIrcCache } from "../../../twitch-irc-cache";
import { featureFlags } from "../../../constants/feature-flags";
import { persistUserChatMessage } from "../../../handlers/db/persis-user-chat-message/persist-user-chat-message";
import { persistUserJoinedChat } from "../../../handlers/db/persist-user-joined-chat/persist-user-joined-chat";
import { persistUserLeftChat } from "../../../handlers/db/persis-user-left-chat/persist-user-left-chat";
import { type UserJoinedChat } from "@dollardojo/modules/types/chat/user-joined-chat";
import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";
import { type PersistedChatMessageCacheData } from "@dollardojo/modules/types/chat/persisted-chat-message-cache-data";

export const addMessageToCache = async (
  message: string | string[] | ChatMessageObject | UserJoinedChat,
  cacheData: unknown[],
  ircResourceKey: string,
  io: any
  // eslint-disable-next-line max-params
) => {
  if (!message) {
    return;
  }

  if (Array.isArray(message) && message[0] === null) {
    return;
  }

  const msgObj = ircMessageObject(message, ircResourceKey);
  const updatedCache = [...cacheData, msgObj];

  try {
    twitchIrcCache.set(ircResourceKey, updatedCache);

    const featureFlagValue = featureFlags[ircResourceKey];

    if (typeof featureFlagValue === "object" && featureFlagValue.logToConsole) {
      console.log(
        `\n\n${ircResourceKey} cache data:\n`,
        JSON.stringify(twitchIrcCache.get(ircResourceKey), null, 2)
      );

      const cacheData = twitchIrcCache.get(ircResourceKey) as any[];

      if (cacheData.length) {
        io.sockets.emit(`${ircResourceKey}-cache`, {
          data: cacheData,
        });
      }

      switch (ircResourceKey) {
        case ircResourceKeys.chatMessages:
          await persistUserChatMessage(
            cacheData as PersistedChatMessageCacheData[]
          );
          twitchIrcCache.set(ircResourceKey, []);
          break;
        case ircResourceKeys.userJoinedChat:
          await persistUserJoinedChat(cacheData as any);
          twitchIrcCache.set(ircResourceKey, []);
          break;
        case ircResourceKeys.userLeftChat:
          await persistUserLeftChat(cacheData as any);
          twitchIrcCache.set(ircResourceKey, []);
          break;
        default:
          break;
      }
    }

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
