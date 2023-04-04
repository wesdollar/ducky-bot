import { logMessageTitle } from "../log-formatters/log-message-title";

export const getUserLeftChat = (message: any) => {
  const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv PART #(\w+)/;
  const match = message.match(regex);

  if (match) {
    const [, user, , channel] = match;

    logMessageTitle("user left chat");

    console.log(`User: ${user}`);
    console.log(`Channel: ${channel}`);
  }
};
