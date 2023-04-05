import { formatMessageContent } from "../../cache/format-message-content/format-message-content";
import { logMessageTitle } from "../../log-formatters/log-message-title";

export interface ChatMessageObject {
  user: string;
  message: string;
}

export const getChatMessage = (
  message: string
): ChatMessageObject | undefined => {
  try {
    const regex = /:(.+?)!(.*?)\sPRIVMSG\s#dollardojo\s:(.*)/;
    const match = message.match(regex);

    if (match) {
      const [, username, , messageText] = match;

      logMessageTitle("chat message received");

      return {
        user: username as string,
        message: formatMessageContent(messageText),
      };
    }
  } catch (error) {
    console.error(error);
  }
};
