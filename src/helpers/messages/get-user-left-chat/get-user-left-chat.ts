import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

type Username = string;

export const getUserLeftChat = (message: string): Username | undefined => {
  if (message.includes("PART #dollardojo")) {
    const usernameMatch = /:(\w+)!/.exec(message);

    console.log(usernameMatch);

    if (usernameMatch && usernameMatch.length >= 2) {
      logIncomingMessageTitle("user left chat", ircResourceKeys.userLeftChat);

      const [, extractedUsername] = usernameMatch;

      return extractedUsername;
    }
  }
};
