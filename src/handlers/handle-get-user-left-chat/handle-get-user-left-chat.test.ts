import { getUserLeftChat } from "../../helpers/messages/get-user-left-chat/get-user-left-chat";
import { ircCacheResourceKeys } from "../../constants/irc-cache-keys";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { handleGetUserLeftChat } from "./handle-get-user-left-chat";

jest.mock(
  "../../helpers/messages/get-user-left-chat/get-user-left-chat",
  () => ({
    getUserLeftChat: jest.fn(),
  })
);

const mockGetUserLeftChat = getUserLeftChat as jest.Mock;

jest.mock(
  "../../helpers/cache/add-message-to-cache/add-message-to-cache",
  () => ({
    addMessageToCache: jest.fn(),
  })
);

const message = "hi";
const getUserLeftChatReturnObj = { message, timestamp: "now" };

describe("handle get user left chat", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("it should call add message to cache with correct payload", () => {
    mockGetUserLeftChat.mockReturnValue(getUserLeftChatReturnObj);

    handleGetUserLeftChat(message, []);

    expect(addMessageToCache).toBeCalledWith(
      getUserLeftChatReturnObj,
      [],
      ircCacheResourceKeys.userLeftChat
    );
  });

  it("should not call addMessageToCache when userLeftChat is empty", () => {
    mockGetUserLeftChat.mockReturnValue(undefined);

    handleGetUserLeftChat(message, []);

    expect(addMessageToCache).toBeCalledTimes(0);
  });
});