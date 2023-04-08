import { ircResourceKeys } from "../../../constants/irc-resource-keys";
import { formatMessageContent } from "../../cache/format-message-content/format-message-content";
import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";

export interface ChatMessageObject {
  displayName: string;
  username: string;
  message: string;
  mod: boolean;
  subscriber: boolean;
}

// TODO: figure out why this is matching
// 60-76,78-94,96-112,114-130,132-148/emotesv2_6763a57d96014734b37fdf3e704da8b6:150-162,164-176,178-190,192-204,206-218/emotesv2_67999c5926974f2abba31a4063849799:0-13,15-28,30-43,45-58;first-msg=0;flags=;id=e57c18f9-1e9b-4e97-95ce-837c684c7f1d;mod=1;returning-chatter=0;room-id=889699487;subscriber=0;tmi-sent-ts=1680853017078;turbo=0;user-id=140206419;user-type=mod :theshootyloots - thesho95Cheers thesho95Cheers thesho95Cheers thesho95Cheers thesho95SteveLove thesho95SteveLove thesho95SteveLove thesho95SteveLove thesho95SteveLove unicor246Uwus unicor246Uwus unicor246Uwus unicor246Uwus unicor246Uwus

export const getChatMessage = (
  message: string
): ChatMessageObject | undefined => {
  const regex =
    /@badge-info=([^;]*)\b.*badges=([^;]*)\b.*display-name=([^;]*)\b.*mod=([^;]*)\b.*subscriber=([^;]*)\b.*user-id=(\d+)\b.*user-type= :([^!]+).*PRIVMSG.*:(.*)/;

  const match = message.match(regex);

  if (match) {
    const [, , , displayName, mod, subscriber, , username, message] = match;

    const chatData = {
      displayName,
      mod: Boolean(mod),
      subscriber: Boolean(subscriber),
      username,
      message: formatMessageContent(message),
    };

    logIncomingMessageTitle(
      "chat message received",
      ircResourceKeys.chatMessages
    );

    return chatData;
  }

  return undefined;
};

// export const legacyGetChatMessage = (
//   message: string
// ): ChatMessageObject | undefined => {
//   try {
//     const regex2 = /user-type=\s*:(.+?)!.*\sPRIVMSG\s#dollardojo\s:(.*)/;
//     const match2 = message.match(regex2);

//     if (match2) {
//       // @ts-ignore go away, TS
//       const [, username, messageText] = match2;

//       logIncomingMessageTitle(
//         "chat message received",
//         ircResourceKeys.chatMessages
//       );

//       return {
//         user: username as string,
//         message: formatMessageContent(messageText),
//       };
//     }

//     const regex = /:(.+?)!(.*?)\sPRIVMSG\s#dollardojo\s:(.*)/;
//     const match = message.match(regex);

//     if (match) {
//       const [, username, , messageText] = match;

//       logIncomingMessageTitle("chat message received");

//       return {
//         user: username as string,
//         message: formatMessageContent(messageText),
//       };
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
