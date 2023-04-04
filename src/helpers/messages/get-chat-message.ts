import { logMessageTitle } from "../log-formatters/log-message-title";

export const getChatMessage = (message: any) => {
  const regex = /PRIVMSG #([\w-]+) :(.+)/;
  const chatMessageMatch = message.match(regex);

  if (chatMessageMatch) {
    const [, userName, messageText] = chatMessageMatch;

    logMessageTitle("chat message received");

    console.log(`user: ${userName}`);
    console.log(`message: ${messageText}\n`);
  }
};
