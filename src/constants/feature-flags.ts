import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";

type FeatureFlags = {
  [key: string]:
    | {
        enabled?: boolean;
        logToConsole?: boolean;
      }
    | boolean;
};

export const featureFlags: FeatureFlags = {
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
  allowLogToConsole: true,
};
