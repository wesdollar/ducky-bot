import { logMessageTitle } from "../log-formatters/log-message-title";

export const getUserJoinedChat = (message: any) => {
  const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv JOIN #(\w+)/;
  const match = message.match(regex);

  if (match) {
    const [, user] = match;

    logMessageTitle("user joined chat");

    console.log(`user: ${user}`);
  }
};
