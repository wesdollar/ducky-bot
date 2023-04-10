import { ircResourceKeys } from "@dollardojo/modules/dist/constants/irc-resource-keys";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

export const getUserLeftChat = (message: string) => {
  const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv PART #(\w+)/;
  const match = message.match(regex);

  if (match) {
    console.log("hit user left chat inside match");

    const [, user] = match;

    logIncomingMessageTitle("user left chat", ircResourceKeys.userLeftChat);

    return user;
  }
};
