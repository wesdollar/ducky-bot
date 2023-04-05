import type NodeCache from "node-cache";
import { ircMessageObject } from "../irc-message-object/irc-message-object";
import { type ChatMessageObject } from "../../messages/get-chat-message/get-chat-message";

export const addMessageToCache = (
  message: string | string[] | ChatMessageObject,
  cacheData: unknown[],
  cacheInstance: NodeCache,
  ircResourceKey: string
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
    cacheInstance.set(ircResourceKey, updatedCache);

    console.log(
      `\n\n${ircResourceKey} cache data: `,
      JSON.stringify(cacheInstance.get(ircResourceKey), null, 2)
    );

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
