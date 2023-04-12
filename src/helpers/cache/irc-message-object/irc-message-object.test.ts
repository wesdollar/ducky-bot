import { ircMessageObject } from "./irc-message-object";

const currentTime = "current time";

jest.mock("@dollardojo/modules/helpers/get-timestamp/get-timestamp", () => ({
  getTimestamp: jest.fn(() => currentTime),
}));

jest.mock("../format-message-content/format-message-content", () => ({
  formatMessageContent: jest.fn((data) => data),
}));

const testString = "this is my string";

describe("creation of the irc message object", () => {
  it("should return a properly formatted object represening the message to be persisted in cache and storage", () => {
    const result = ircMessageObject(testString, "hello");

    expect(result).toEqual({
      message: testString,
      timestamp: currentTime,
    });
  });
});
