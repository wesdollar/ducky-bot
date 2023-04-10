export type ParsedChatMessage = {
  displayName: string;
  mod: boolean;
  subscriber: boolean;
  userId: string;
  chatMessage: string;
};

export const parseChatMessage = (
  message: string
): ParsedChatMessage | undefined => {
  if (!message.includes("PRIVMSG")) {
    return undefined;
  }

  console.log(message);

  const [tagsString, messageBody] = message.split(" :");
  const tags = tagsString
    .slice(1)
    .split(";")
    .reduce((acc, curr) => {
      const [key, value] = curr.split("=");

      // @ts-ignore shutup
      acc[key] = value;

      return acc;
    }, {});

  const [, user] = messageBody.split("!");
  const [displayName] = user.split("@");

  const chatMessage = messageBody.split(":").pop();

  const messageProperties = {
    displayName,
    // @ts-ignore shutup
    mod: tags.mod === "1",
    // @ts-ignore shutup
    subscriber: tags.subscriber === "1",
    // @ts-ignore shutup
    userId: tags["user-id"],
    chatMessage: chatMessage || "",
  };

  return messageProperties;
};
