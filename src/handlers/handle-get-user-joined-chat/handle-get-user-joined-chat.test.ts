import { getUserJoinedChat } from "../../helpers/messages/get-user-joined-chat/get-user-joined-chat";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { handleGetUserJoinedChat } from "./handle-get-user-joined-chat";

jest.mock("../../twitch-irc-cache", () => ({
  twitchIrcCache: jest.fn(),
}));

jest.mock("../../helpers/messages/get-chat-message/get-chat-message", () => ({
  getChatMessage: jest.fn((data) => data),
}));

jest.mock(
  "../../helpers/messages/get-user-joined-chat/get-user-joined-chat",
  () => ({
    getUserJoinedChat: jest.fn((data) => data),
  })
);

const io = jest.fn();
const mockGetUserJoinedChat = getUserJoinedChat as jest.Mock;

jest.mock(
  "../../helpers/cache/add-message-to-cache/add-message-to-cache",
  () => ({
    addMessageToCache: jest.fn(),
  })
);

const string1 = "ducky was here";

const mockUserJoinedChatObj = {
  message: {
    username: "ducky",
    subscriber: false,
    mod: true,
    lastSeen: null,
  },
  timestamp: "now",
};

describe("handle get user joined chat", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should store off to cache whenever a user joins the chat", async () => {
    mockGetUserJoinedChat.mockReturnValue(mockUserJoinedChatObj);

    await handleGetUserJoinedChat(string1, [], io);

    expect(addMessageToCache).toBeCalled();
  });

  it("should not call addMessageToCache when userJoinedChat has no value", () => {
    mockGetUserJoinedChat.mockReturnValue(undefined);

    handleGetUserJoinedChat(string1, [], io);

    expect(addMessageToCache).toBeCalledTimes(0);
  });
});
