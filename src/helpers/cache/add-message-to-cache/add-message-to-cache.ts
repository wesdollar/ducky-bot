import { ircMessageObject } from "../irc-message-object/irc-message-object";
import { type ChatMessageObject } from "../../messages/get-chat-message/get-chat-message";
import { twitchIrcCache } from "../../../twitch-irc-cache";
import { featureFlags } from "../../../constants/feature-flags";
import { ircResourceKeys } from "../../../constants/irc-resource-keys";
import {
  type PersistedChatMessageCacheData,
  persistUserChatMessage,
} from "../../../handlers/db/persis-user-chat-message/persist-user-chat-message";
import { persistUserJoinedChat } from "../../../handlers/db/persist-user-joined-chat/persist-user-joined-chat";
import { persistUserLeftChat } from "../../../handlers/db/persis-user-left-chat/persist-user-left-chat";

export interface UserJoinedChat {
  username: string;
  lastSeen: Date | null;
  mod: boolean;
  subscriber: boolean;
}

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

    // @ts-ignore fuck off
    if (featureFlags[ircResourceKey].logToConsole) {
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
