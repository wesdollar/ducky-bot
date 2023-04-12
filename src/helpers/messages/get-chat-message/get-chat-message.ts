import { camelCase, trimStart } from "lodash";
import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";
import { formatMessageContent } from "../../cache/format-message-content/format-message-content";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";
import { audioChatCommands } from "@dollardojo/modules/constants/audio-chat-commands";
import { type ChatMessageObject } from "@dollardojo/modules/types/chat/chat-message-object";
import { type ParsedMessageData } from "@dollardojo/modules/types/irc-messages/parsed-message-data";

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

    if (id) {
      return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/static/dark/3.0`;
    }

    return null;
  });

  // TODO: replace characters with actual emote
  // @badge-info=subscriber/1;badges=broadcaster/1,subscriber/0,sub-gifter/1;client-nonce=8e2c3b59cd04cc46b40995c0a43fbcba;color=;display-name=DollarDojo;emote-only=1;emotes=emotesv2_65dc3686b8204c0ba506b5b8da4ee8f6:0-11,13-24,26-37;first-msg=0;flags=;id=1c47f58c-5bca-4420-af56-0318ef50b0ca;mod=0;returning-chatter=0;room-id=889699487;subscriber=1;tmi-sent-ts=1681087804493;turbo=0;user-id=889699487;user-type= :dollardojo!dollardojo@dollardojo.tmi.twitch.tv PRIVMSG #dollardojo :dollar62Hype dollar62Hype dollar62Hype

  const chatData: ChatMessageObject = {
    displayName,
    mod: Boolean(Number(mod)),
    subscriber: Boolean(Number(subscriber)),
    username,
    emotes: emotesArray,
    message: formatMessageContent(chatMessage),
    chatCommand: "",
  };

  for (const chatCommand of audioChatCommands) {
    if (chatData.message.includes(`!${chatCommand}`)) {
      chatData.chatCommand = chatCommand;

      break;
    }
  }

  logIncomingMessageTitle(
    "chat message received",
    ircResourceKeys.chatMessages
  );

  return chatData;
};
