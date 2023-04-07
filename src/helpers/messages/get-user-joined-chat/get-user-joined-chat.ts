import { featureFlags } from "../../../constants/feature-flags";
import { ircResourceKeys } from "../../../constants/irc-resource-keys";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

export const getUserJoinedChat = (message: string) => {
  const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv JOIN #(\w+)/;
  const match = message.match(regex);

  if (match) {
    const [, user] = match;

    logIncomingMessageTitle(
      "user joined chat",
      featureFlags[ircResourceKeys.userJoinedChat].logToConsole
    );

    return user;
  }

  return null;
};
