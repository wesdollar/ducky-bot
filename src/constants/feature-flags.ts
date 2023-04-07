import { ircResourceKeys } from "./irc-resource-keys";

export const featureFlags = {
  allowLogToConsole: true,
  [ircResourceKeys.chatMessages]: {
    logToConsole: true,
  },
  [ircResourceKeys.userJoinedChat]: {
    logToConsole: false,
  },
  [ircResourceKeys.userLeftChat]: {
    logToConsole: false,
  },
  [ircResourceKeys.usersInChat]: {
    enabled: false,
    logToConsole: false,
  },
};
