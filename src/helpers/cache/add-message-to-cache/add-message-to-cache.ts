import NodeCache from "node-cache";
import { ircMessageObject } from "../irc-message-object/irc-message-object";
import { type ChatMessageObject } from "../../messages/get-chat-message/get-chat-message";

export const addMessageToCache = (
  message: string | string[] | ChatMessageObject,
  cacheData: string[],
  cacheInstance: NodeCache,
  ircResourceKey: string
  // eslint-disable-next-line max-params
) => {
  const updatedCache = cacheData.push(ircMessageObject(message));

  try {
    cacheInstance.set(ircResourceKey, updatedCache);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
