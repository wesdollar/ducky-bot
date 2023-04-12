import { handleGetChatMessages } from "./handle-get-chat-messages";
import { getChatMessage } from "../../helpers/messages/get-chat-message/get-chat-message";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";

jest.mock("../../helpers/messages/get-chat-message/get-chat-message", () => ({
  getChatMessage: jest.fn(),
}));

jest.mock(
  "../../helpers/cache/add-message-to-cache/add-message-to-cache",
  () => ({
    addMessageToCache: jest.fn(),
  })
);

describe("handleGetChatMessages", () => {
  const message = "test message";
  const io = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call getChatMessage with the message", () => {
    handleGetChatMessages(message, [], io);

    expect(getChatMessage).toHaveBeenCalledWith(message);
  });

  it("should not call addMessageToCache if chatMessage is falsy", () => {
    (getChatMessage as jest.Mock).mockReturnValue(null);

    handleGetChatMessages(message, [], io);

    expect(addMessageToCache).not.toHaveBeenCalled();
  });

  it("should not call addMessageToCache if chatMessage is an empty object", () => {
    (getChatMessage as jest.Mock).mockReturnValue({});

    handleGetChatMessages(message, [], io);

    expect(addMessageToCache).not.toHaveBeenCalled();
  });

  it("should call addMessageToCache with the chatMessage, userMessagesCache, ircResourceKeys.chatMessages, and io", () => {
    const chatMessage = {
      username: "testuser",
      message: "test message",
    };

    (getChatMessage as jest.Mock).mockReturnValue(chatMessage);

    handleGetChatMessages(message, [], io);

    expect(addMessageToCache).toHaveBeenCalledWith(
      chatMessage,
      [],
      ircResourceKeys.chatMessages,
      io
    );
  });
});
