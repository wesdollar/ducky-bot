import { getNamesInChat } from "../../helpers/messages/get-names-in-chat/get-names-in-chat";
import { addMessageToCache } from "../../helpers/cache/add-message-to-cache/add-message-to-cache";
import { featureFlags } from "../../constants/feature-flags";
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

jest.mock("../../constants/feature-flags", () => ({
  featureFlags: {
    enableGetAllUsers: true,
  },
}));

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

    handleGetNamesInChat(string1, []);

    expect(addMessageToCache).toBeCalled();
  });
});

describe("when feature flag for enable get all users is set to false", () => {
  beforeAll(() => {
    (featureFlags as any).enableGetAllUsers = false;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not call addMessageToCache when feature flag for enable get all users is set to false", () => {
    handleGetNamesInChat(string1, []);

    expect(addMessageToCache).toBeCalledTimes(0);
  });
});
