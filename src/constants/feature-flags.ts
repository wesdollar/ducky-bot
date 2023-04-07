import { ircResourceKeys } from "./irc-resource-keys";

export const featureFlags = {
  [ircResourceKeys.chatMessages]: {
    logToConsole: true,
  },
  [ircResourceKeys.usersInChat]: {
    logToConsole: false,
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
