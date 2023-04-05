import { logMessageTitle } from "../../log-formatters/log-message-title";

export interface ChatMessageObject {
  user: string;
  message: string;
}

export const getChatMessage = (
  message: string
): ChatMessageObject | undefined => {
  try {
    const regex = /^:([^!]+).+:(.*)$/;
    const matches = message.match(regex);

    if (matches) {
      const [, username, messageText] = matches;

      logMessageTitle("chat message received");

      return { user: username as string, message: messageText as string };
    }
  } catch (error) {
    console.log(error);
  }
};
