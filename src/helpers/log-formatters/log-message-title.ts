import { featureFlags } from "../../constants/feature-flags";
import { ircResourceKeys } from "../../constants/irc-resource-keys";

export const logIncomingMessageTitle = (
  messageDescription: string,
  allowLogToConsole = true
) => {
  if (
    allowLogToConsole &&
    featureFlags[ircResourceKeys.chatMessages].logToConsole
  ) {
    console.log(`\n:: ${messageDescription} ::`);
  }
};
