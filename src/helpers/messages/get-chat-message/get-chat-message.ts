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
    // TODO: why are we match on this?
    // 20-35/emotesv2_c086a52d3c304d88becb97389b451f76:37-51/emotesv2_e349077a987e42beaad19404fc701657:53-64/emotesv2_36f9c9d076334989a85e1b45ff430dff:0-18;first-msg=0;flags=;id=8295d1e2-fbfa-4e93-b7c5-b4c0f47f25c9;mod=0;returning-chatter=0;room-id=889699487;subscriber=1;tmi-sent-ts=1680725669243;turbo=0;user-id=889699487;user-type= :dollardojo
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
