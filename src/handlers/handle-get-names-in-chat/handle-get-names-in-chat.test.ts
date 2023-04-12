import { getNamesInChat } from "../../helpers/messages/get-names-in-chat/get-names-in-chat";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { handleGetNamesInChat } from "./handle-get-names-in-chat";

jest.mock("../../helpers/messages/get-names-in-chat/get-names-in-chat", () => ({
  getNamesInChat: jest.fn(),
}));

const mockGetNamesInChat = getNamesInChat as jest.Mock;

jest.mock(
  "../../helpers/cache/add-message-to-cache/add-message-to-cache",
  () => ({
    addMessageToCache: jest.fn(),
  })
);

const string1 = "this";

describe("handle get names in chat", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add message to cache when we parse the users in chat on bot entry of channel", () => {
    mockGetNamesInChat.mockReturnValue(["this", "that"]);

    handleGetNamesInChat(string1, [], () => {});

    expect(addMessageToCache).toBeCalled();
  });
});
