import { camelCase, trimStart } from "lodash";
import { ircResourceKeys } from "../../../constants/irc-resource-keys";
import { formatMessageContent } from "../../cache/format-message-content/format-message-content";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";
import { audioChatCommands } from "../../../constants/chat-commands";

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
  chatCommands: string[];
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

  const { displayName, mod, subscriber, emotes } = obj as ParsedMessageData;

  const emotesArray = emotes.split("/").map((emote: string) => {
    const [id] = emote.split(":");

    if (!id) {
      return null;
    }

    return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/static/dark/3.0`;
  });

  const chatData = {
    displayName,
    mod: Boolean(Number(mod)),
    subscriber: Boolean(Number(subscriber)),
    username,
    emotes: emotesArray,
    message: formatMessageContent(chatMessage),
    chatCommands: [] as string[],
  };

  audioChatCommands.some((command) => {
    if (chatData.message.includes(command)) {
      console.log("includes commands: ", command);

      return (chatData.chatCommands = [command]);
    }

    return [];
  });

  logIncomingMessageTitle(
    "chat message received",
    ircResourceKeys.chatMessages
  );

  return chatData;
};
