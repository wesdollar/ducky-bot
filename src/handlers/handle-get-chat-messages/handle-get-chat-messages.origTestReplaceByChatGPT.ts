import { getChatMessage } from "../../helpers/messages/get-chat-message/get-chat-message";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { handleGetChatMessages } from "./handle-get-chat-messages";
import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";

jest.mock("../../twitch-irc-cache", () => ({
  twitchIrcCache: jest.fn(),
}));

jest.mock("../../helpers/messages/get-chat-message/get-chat-message", () => ({
  getChatMessage: jest.fn((data) => data),
}));

const mockGetChatMessage = getChatMessage as jest.Mock;
const io = jest.fn();

jest.mock(
  "../../helpers/cache/add-message-to-cache/add-message-to-cache",
  () => ({
    addMessageToCache: jest.fn(),
  })
);

const message = "ducky was here";

describe("handle get chat messages", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("get chat message when use posts to chat", () => {
    handleGetChatMessages(message, [], io);

    expect(addMessageToCache).toBeCalled();
  });

  it("it should get chat message", () => {
    handleGetChatMessages(message, [], io);

    expect(getChatMessage).toBeCalled();
  });
});

describe("when data should persist", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call addMessageToCache only when chat message is an object", () => {
    const messageObj = { message: "hi", timestamp: "now" };

    mockGetChatMessage.mockReturnValueOnce(messageObj);

    handleGetChatMessages("hi", [], io);

    expect(addMessageToCache).toBeCalledWith(
      messageObj,
      [],
      ircResourceKeys.chatMessages,
      io
    );
  });

  it("should not call addMessageToCache when string is empty", () => {
    handleGetChatMessages("", [], io);

    expect(addMessageToCache).toBeCalledTimes(0);
  });

  it("should not call addMessageToCache when string is empty", () => {
    const messageObj = {};

    mockGetChatMessage.mockReturnValueOnce(messageObj);

    handleGetChatMessages("", [], io);

    expect(addMessageToCache).toBeCalledTimes(0);
  });
});
