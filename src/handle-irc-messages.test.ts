import { handleGetNamesInChat } from "./handlers/handle-get-names-in-chat/handle-get-names-in-chat";
import { handleGetChatMessages } from "./handlers/handle-get-chat-messages/handle-get-chat-messages";
import { handleGetUserJoinedChat } from "./handlers/handle-get-user-joined-chat/handle-get-user-joined-chat";
import { handleGetUserLeftChat } from "./handlers/handle-get-user-left-chat/handle-get-user-left-chat";
import { handleIrcMessages } from "./handle-irc-messages";

const message = "Pretty Lights is back, yo!";

jest.mock(
  "./handlers/handle-get-names-in-chat/handle-get-names-in-chat",
  () => ({
    handleGetNamesInChat: jest.fn(),
  })
);

jest.mock(
  "./handlers/handle-get-chat-messages/handle-get-chat-messages",
  () => ({
    handleGetChatMessages: jest.fn(),
  })
);

jest.mock(
  "./handlers/handle-get-user-joined-chat/handle-get-user-joined-chat",
  () => ({
    handleGetUserJoinedChat: jest.fn(),
  })
);

jest.mock(
  "./handlers/handle-get-user-left-chat/handle-get-user-left-chat",
  () => ({
    handleGetUserLeftChat: jest.fn(),
  })
);

describe("handle irc message", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call handleGetNamesInChat with appropriate payload", () => {
    handleIrcMessages(message);

    expect(handleGetNamesInChat).toBeCalledWith(message, []);
  });

  it("should call handleGetChatMessage with appropriate payload", () => {
    handleIrcMessages(message);

    expect(handleGetChatMessages).toBeCalledWith(message, []);
  });

  it("should call handleGetUserJoinedChat with appropriate payload", () => {
    handleIrcMessages(message);

    expect(handleGetUserJoinedChat).toBeCalledWith(message, []);
  });

  it("should call handleGetUserLeftChat with appropriate payload", () => {
    handleIrcMessages(message);

    expect(handleGetUserLeftChat).toBeCalledWith(message, []);
  });
});
