import { logMessageContent } from "./log-message-content";

console.log = jest.fn();

describe("log message content, which logs data in a standardized way to our console", () => {
  it("should console log the message", () => {
    const testMessage = "here's my message";

    logMessageContent(testMessage);

    expect(console.log).toBeCalled();
    expect(console.log).toBeCalledWith(testMessage);
  });
});
