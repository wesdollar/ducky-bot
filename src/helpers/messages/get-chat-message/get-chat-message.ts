import { formatMessageContent } from "../../cache/format-message-content/format-message-content";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

export interface ChatMessageObject {
  user: string;
  message: string;
}

export const getChatMessage = (
  message: string
): ChatMessageObject | undefined => {
  try {
    const regex2 = /user-type=\s*:(.+?)!.*\sPRIVMSG\s#dollardojo\s:(.*)/;
    const match2 = message.match(regex2);

    if (match2) {
      // @ts-ignore go away, TS
      const [, username, messageText] = match2;

      logIncomingMessageTitle("chat message received");

      return {
        user: username as string,
        message: formatMessageContent(messageText),
      };
    }

    const regex = /:(.+?)!(.*?)\sPRIVMSG\s#dollardojo\s:(.*)/;
    const match = message.match(regex);

    if (match) {
      const [, username, , messageText] = match;

      logIncomingMessageTitle("chat message received");

      return {
        user: username as string,
        message: formatMessageContent(messageText),
      };
    }
  } catch (error) {
    console.error(error);
  }
};
