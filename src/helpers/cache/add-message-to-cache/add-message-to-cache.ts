import { ircMessageObject } from "../irc-message-object/irc-message-object";
import { type ChatMessageObject } from "../../messages/get-chat-message/get-chat-message";
import { twitchIrcCache } from "../../../twitch-irc-cache";
import { featureFlags } from "../../../constants/feature-flags";

export const addMessageToCache = (
  message: string | string[] | ChatMessageObject,
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
    }

    io.sockets.emit("caasi", {
      message: twitchIrcCache.get(ircResourceKey),
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
