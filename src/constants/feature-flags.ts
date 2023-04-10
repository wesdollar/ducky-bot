import { ircResourceKeys } from "@dollardojo/modules/dist/constants/irc-resource-keys";

export const featureFlags = {
  allowLogToConsole: true,
  [ircResourceKeys.chatMessages]: {
    logToConsole: true,
  },
  [ircResourceKeys.userJoinedChat]: {
    logToConsole: true,
  },
  [ircResourceKeys.userLeftChat]: {
    logToConsole: true,
  },
  [ircResourceKeys.usersInChat]: {
    enabled: false,
    logToConsole: false,
  },
};
