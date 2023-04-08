import { ircResourceKeys } from "../../../constants/irc-resource-keys";
import { formatMessageContent } from "../../cache/format-message-content/format-message-content";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

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
  const regex =
    /@badge-info=([^;]*)\b.*badges=([^;]*)\b.*display-name=([^;]*)\b.*mod=([^;]*)\b.*subscriber=([^;]*)\b.*user-id=(\d+)\b.*user-type= :([^!]+).*PRIVMSG.*:(.*)/;

  const match = message.match(regex);

  if (match) {
    const [, , , displayName, mod, subscriber, , username, message] = match;

    const chatData = {
      displayName,
      mod: Boolean(Number(mod)),
      subscriber: Boolean(Number(subscriber)),
      username,
      message: formatMessageContent(message),
    };

    logIncomingMessageTitle(
      "chat message received",
      ircResourceKeys.chatMessages
    );

    return chatData;
  }

  return undefined;
};
