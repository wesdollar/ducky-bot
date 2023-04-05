import { getChatMessage } from "./helpers/messages/get-chat-message/get-chat-message";
import { addMessageToCache } from "./helpers/cache/add-message-to-cache/add-message-to-cache";
import { handleIrcMessages } from "./handle-irc-messages";

const string1 = "Pretty Lights is back, yo!";

jest.mock("./helpers/cache/add-message-to-cache/add-message-to-cache", () => ({
  addMessageToCache: jest.fn(),
}));

jest.mock("./helpers/messages/get-names-in-chat/get-names-in-chat", () => ({
  getNamesInChat: jest.fn((data) => [...data]),
}));

jest.mock("./helpers/messages/get-chat-message/get-chat-message", () => ({
  getChatMessage: jest.fn((data) => data),
}));

jest.mock(
  "./helpers/messages/get-user-joined-chat/get-user-joined-chat",
  () => ({
    getUserJoinedChat: jest.fn((data) => data),
  })
);

jest.mock("./helpers/messages/get-user-left-chat/get-user-left-chat", () => ({
  getUserLeftChat: jest.fn((data) => data),
}));

const mockGetChatMessage = getChatMessage as jest.Mock;

describe("happy path: handle irc message, strings and buffers are supports", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add message to cache when we parse the users in chat on bot entry of channel", () => {
    handleIrcMessages(string1);

    expect(addMessageToCache).toBeCalled();
  });

  it("should call add message to cache", () => {
    handleIrcMessages(string1);

    expect(addMessageToCache).toBeCalledTimes(4);
  });

  it("get chat message when use posts to chat", () => {
    handleIrcMessages(string1);

    // expect(twitchIrcCache).toBeCalled();
    expect(addMessageToCache).toBeCalled();
  });

  it("should store off to cache whenever a user joins the chat", () => {
    handleIrcMessages(string1);

    // expect(twitchIrcCache).toBeCalled();
    expect(addMessageToCache).toBeCalled();
  });

  it("should store off to cache whenever a user leaves the chat", () => {
    handleIrcMessages(string1);

    // expect(twitchIrcCache).toBeCalled();
    expect(addMessageToCache).toBeCalled();
  });
});

describe("unhappy path: when an empty string is returned from any of the getters, no action should be taken", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("not call addMessageToCache when there is no string value", () => {
    handleIrcMessages("");

    expect(addMessageToCache).toBeCalledTimes(0);
  });

  it("should call add to message", () => {
    handleIrcMessages("");

    expect(addMessageToCache).toBeCalledTimes(0);
  });

  it("get chat message when use posts to chat", () => {
    mockGetChatMessage.mockReturnValueOnce({});

    handleIrcMessages("");

    // expect(twitchIrcCache).toBeCalled();
    expect(addMessageToCache).toBeCalledTimes(0);
  });

  it("should store off to cache whenever a user joins the chat", () => {
    handleIrcMessages("");

    // expect(twitchIrcCache).toBeCalled();
    expect(addMessageToCache).toBeCalledTimes(0);
  });

  it("should store off to cache whenever a user leaves the chat", () => {
    handleIrcMessages("");

    // expect(twitchIrcCache).toBeCalled();
    expect(addMessageToCache).toBeCalledTimes(0);
  });
});
