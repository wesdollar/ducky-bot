import NodeCache from "node-cache";
import { addMessageToCache } from "./add-message-to-cache";
import { type ChatMessageObject } from "../../messages/get-chat-message/get-chat-message";

describe("addMessageToCache", () => {
  let cacheInstance: NodeCache;
  const ircResourceKey = "test-key";
  const cacheData = ["test1", "test2"];

  beforeEach(() => {
    cacheInstance = new NodeCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add message to cache and return true", () => {
    const message: string = "test3";

    const result = addMessageToCache(
      message,
      cacheData,
      cacheInstance,
      ircResourceKey
    );

    expect(result).toBeTruthy();
  });

  it("should add chat message object to cache and return true", () => {
    const message: ChatMessageObject = {
      user: "testuser",
      message: "test message",
    };

    const result = addMessageToCache(
      message,
      cacheData,
      cacheInstance,
      ircResourceKey
    );

    expect(result).toBeTruthy();
  });

  it("should catch and log error when cache set fails", () => {
    const message: string = "test3";
    const errorMsg = "test error";

    jest.spyOn(cacheInstance, "set").mockImplementation(() => {
      throw new Error(errorMsg);
    });

    const result = addMessageToCache(
      message,
      cacheData,
      cacheInstance,
      ircResourceKey
    );

    expect(result).toBeFalsy();
  });
});
