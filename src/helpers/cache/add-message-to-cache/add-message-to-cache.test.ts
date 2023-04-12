import NodeCache from "node-cache";
import { addMessageToCache } from "./add-message-to-cache";
import { twitchIrcCache } from "../../../twitch-irc-cache";
import { ircMessageObject } from "../irc-message-object/irc-message-object";
import { ircResourceKeys } from "@dollardojo/modules/constants/irc-resource-keys";

jest.mock("../irc-message-object/irc-message-object", () => ({
  ircMessageObject: jest.fn(() => ({
    message: "Pretty Light is back!",
    timestamp: "now",
  })),
}));

const mockIrcMessageObject = ircMessageObject as jest.Mock;

const mockEmit = jest.fn() as jest.Mock;

const io = {
  sockets: {
    set: jest.fn(),
    emit: jest.fn(),
    get: jest.fn(),
  },
};

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
    const returnMsgObj = { message, timestamp: "now" };

    mockEmit.mockResolvedValueOnce(true);

    mockIrcMessageObject.mockReturnValueOnce(returnMsgObj);

    jest.spyOn(twitchIrcCache, "get").mockImplementation(() => true);

    const result = addMessageToCache(message, cacheData, ircResourceKey, io);

    expect(result).toBeTruthy();
  });

  it("should add chat message object to cache and return true", () => {
    const returnMsgObj = { message, timestamp: "now" };

    mockIrcMessageObject.mockReturnValueOnce(returnMsgObj);

    jest.spyOn(twitchIrcCache, "set").mockImplementation(() => true);

    addMessageToCache(message, [], ircResourceKey, io);

    expect(twitchIrcCache.set).toBeCalledWith(ircResourceKey, [
      {
        message,
        timestamp: "now",
      },
    ]);
  });

  it("should catch and log error when cache set fails", async () => {
    const message: string = "test3";
    const errorMsg = "test error";

    jest.spyOn(twitchIrcCache, "set").mockImplementation(() => {
      throw new Error(errorMsg);
    });

    const result = await addMessageToCache(
      message,
      cacheData,
      ircResourceKey,
      io
    );

    expect(result).toBeFalsy();
  });

  it("should not allow a array with an index of one that is null pass through", async () => {
    // @ts-ignore mockery
    const result = await addMessageToCache([], [], cacheInstance, "anything");

    expect(result).toBeFalsy();
  });

  it("should log the cached values to console", async () => {
    await addMessageToCache(message, cacheData, ircResourceKey, io);

    expect(console.log).toBeCalledTimes(1);
  });

  it("do nothing if message is empty", async () => {
    const result = await addMessageToCache("", cacheData, ircResourceKey, io);

    expect(result).toBe(undefined);
  });
});
