import { camelCase, trimStart } from "lodash";
import { ircResourceKeys } from "../../../constants/irc-resource-keys";
import { formatMessageContent } from "../../cache/format-message-content/format-message-content";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

export interface ParsedMessageData {
  badgeInfo: string;
  badges: string;
  clientNonce: string;
  color: string;
  displayName: string;
  emoteOnly: string;
  emotes: string;
  firstMsg: string;
  flags: string;
  id: string;
  mod: string;
  returningChatter: string;
  roomId: string;
  subscriber: string;
  tmiSentTs: string;
  turbo: string;
  userId: string;
  userType: string;
  username: string;
  chatMessage: string;
}

export interface ChatMessageObject {
  displayName: string;
  username: string;
  message: string;
  mod: boolean;
  subscriber: boolean;
}

export const getChatMessage = (
  message: string
): ChatMessageObject | undefined => {
  if (!message.includes("PRIVMSG")) {
    return undefined;
  }

  const username = trimStart(message.split(":")[1].split("!")[0]);
  const [, chatMessage] = message.split("#dollardojo :");

  const obj = message.split(";").reduce((acc, pair) => {
    const [key, val] = pair.split("=");

    if (key === "user-type") {
      // @ts-ignore TODO: fix types
      acc.username = username;
      // @ts-ignore TODO: fix types
      acc.chatMessage = chatMessage;
    } else {
      // @ts-ignore TODO: fix types
      acc[camelCase(key)] = val;
    }

    return acc;
  }, {});

  const { displayName, mod, subscriber } = obj as ParsedMessageData;

  const chatData = {
    displayName,
    mod: Boolean(Number(mod)),
    subscriber: Boolean(Number(subscriber)),
    username,
    message: formatMessageContent(chatMessage),
  };

  logIncomingMessageTitle(
    "chat message received",
    ircResourceKeys.chatMessages
  );

  return chatData;
};
