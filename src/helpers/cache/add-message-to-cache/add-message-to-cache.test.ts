import NodeCache from "node-cache";
import { addMessageToCache } from "./add-message-to-cache";
import { twitchIrcCache } from "../../../twitch-irc-cache";
import { ircMessageObject } from "../irc-message-object/irc-message-object";
import { ircResourceKeys } from "../../../constants/irc-resource-keys";

jest.mock("../irc-message-object/irc-message-object", () => ({
  ircMessageObject: jest.fn(() => ({
    message: "Pretty Light is back!",
    timestamp: "now",
  })),
}));

const mockIrcMessageObject = ircMessageObject as jest.Mock;

console.error = jest.fn();
console.log = jest.fn();

describe("addMessageToCache", () => {
  let cacheInstance: NodeCache;
  const ircResourceKey = ircResourceKeys.chatMessages;
  const cacheData = ["test1", "test2"];

  beforeEach(() => {
    cacheInstance = new NodeCache();

    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const message: string = "test3";

  it("should add message to cache and return true", () => {
    const result = addMessageToCache(message, cacheData, ircResourceKey);

    expect(result).toBeTruthy();
  });

  it("should add chat message object to cache and return true", () => {
    const returnMsgObj = { message, timestamp: "now" };

    mockIrcMessageObject.mockReturnValueOnce(returnMsgObj);

    jest.spyOn(twitchIrcCache, "set").mockImplementation(() => true);

    addMessageToCache(message, [], ircResourceKey);

    expect(twitchIrcCache.set).toBeCalledWith(ircResourceKey, [
      {
        message,
        timestamp: "now",
      },
    ]);
  });

  it("should catch and log error when cache set fails", () => {
    const message: string = "test3";
    const errorMsg = "test error";

    jest.spyOn(twitchIrcCache, "set").mockImplementation(() => {
      throw new Error(errorMsg);
    });

    const result = addMessageToCache(message, cacheData, ircResourceKey);

    expect(result).toBeFalsy();
  });

  it("should not allow a array with an index of one that is null pass through", () => {
    // @ts-ignore mockery
    const result = addMessageToCache([null], [], cacheInstance, "anything");

    expect(result).toBeFalsy();
  });

  it("should log the cached values to console", () => {
    addMessageToCache(message, cacheData, ircResourceKey);

    expect(console.log).toBeCalledTimes(1);
  });

  it("do nothing if message is empty", () => {
    const result = addMessageToCache("", cacheData, ircResourceKey);

    expect(result).toBe(undefined);
  });
});
