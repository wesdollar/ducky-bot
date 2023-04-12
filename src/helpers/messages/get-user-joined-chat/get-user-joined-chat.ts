import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

export const getUserJoinedChat = (message: string) => {
  const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv JOIN #(\w+)/;
  const match = message.match(regex);

  if (match) {
    const [, user] = match;

    logIncomingMessageTitle("user joined chat", ircResourceKeys.userJoinedChat);

    return user;
  }

  return null;
};
