import { logMessageTitle } from "../../log-formatters/log-message-title";

export const getUserJoinedChat = (message: string) => {
  const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv JOIN #(\w+)/;
  const match = message.match(regex);

  if (match) {
    const [, user] = match;

    logMessageTitle("user joined chat");

    return user;
  }

  return null;
};
