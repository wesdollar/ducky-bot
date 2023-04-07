import { featureFlags } from "../../constants/feature-flags";

export const logIncomingMessageTitle = (
  messageDescription: string,
  ircResourceKey = "chat-message"
) => {
  // @ts-ignore TODO: figure out this typing
  if (
    featureFlags.allowLogToConsole &&
    // TODO: ask for help on this
    // @ts-ignore buzz off Typescript
    featureFlags[ircResourceKey].logToConsole
  ) {
    console.log(`\n:: ${messageDescription} ::`);
  }
};
