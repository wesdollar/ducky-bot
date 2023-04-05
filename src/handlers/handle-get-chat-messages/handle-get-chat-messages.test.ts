import { getChatMessage } from "../../helpers/messages/get-chat-message/get-chat-message";
import { ircCacheResourceKeys } from "../../constants/irc-cache-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { handleGetChatMessages } from "./handle-get-chat-messages";

jest.mock("../../twitch-irc-cache", () => ({
  twitchIrcCache: jest.fn(),
}));

jest.mock("../../helpers/messages/get-chat-message/get-chat-message", () => ({
  getChatMessage: jest.fn((data) => data),
}));

const mockGetChatMessage = getChatMessage as jest.Mock;

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
    handleGetChatMessages(message, []);

    expect(addMessageToCache).toBeCalled();
  });

  it("it should get chat message", () => {
    handleGetChatMessages(message, []);

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

    handleGetChatMessages("hi", []);

    expect(addMessageToCache).toBeCalledWith(
      messageObj,
      [],
      ircCacheResourceKeys.chatMessages
    );
  });

  it("should not call addMessageToCache when string is empty", () => {
    handleGetChatMessages("", []);

    expect(addMessageToCache).toBeCalledTimes(0);
  });

  it("should not call addMessageToCache when string is empty", () => {
    const messageObj = {};

    mockGetChatMessage.mockReturnValueOnce(messageObj);

    handleGetChatMessages("", []);

    expect(addMessageToCache).toBeCalledTimes(0);
  });
});
