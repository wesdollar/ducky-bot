import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

export const getUserLeftChat = (message: string) => {
  const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv PART #(\w+)/;
  const match = message.match(regex);

  if (match) {
    const [, user] = match;

    logIncomingMessageTitle("user left chat");

    return user;
  }
};
