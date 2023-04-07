import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";
import { formatMessageContent } from "./format-message-content";

jest.mock("../../log-formatters/log-message-content", () => ({
  logMessageContent: jest.fn(),
}));

jest.mock("../../log-formatters/log-message-title", () => ({
  logIncomingMessageTitle: jest.fn(),
}));

console.error = jest.fn();
console.log = jest.fn();

const testDataString = "this is my string";
const testDataBuffer = Buffer.from("this is my buffer string");

const testDataObjectString = {
  type: "string",
  data: testDataString,
};

const testDataObjectBuffer = {
  type: "buffer",
  data: testDataBuffer,
};

const testDataBufferString = "this is my buffer string";

describe("happy path: format message context", () => {
  it("should return a message of string if the data is a string", () => {
    const response = formatMessageContent(testDataString);

    expect(response).toEqual(testDataString);
  });

  it("should return a message of string if the data is a buffer", () => {
    const response = formatMessageContent(testDataBuffer);

    expect(response).toEqual(testDataBufferString);
  });

  it("should return a message of string if the data exists within an object that has a buffer as its data prop", () => {
    const response = formatMessageContent(testDataObjectBuffer);

    expect(response).toEqual(testDataBufferString);
  });

  it("should return a message of string if the data exists within an object that has a string as its data prop", () => {
    const response = formatMessageContent(testDataObjectString);

    expect(response).toEqual(testDataString);
  });
});

describe("unhappy path", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call logMessage Title if message does not hit on any of the specified types", () => {
    // @ts-ignore mockery
    formatMessageContent(undefined);

    expect(logIncomingMessageTitle).toBeCalledTimes(1);
  });

  it("should call logMessageContent if message does not hit on any of the specified types", () => {
    // @ts-ignore mockery
    formatMessageContent(undefined);

    expect(logIncomingMessageTitle).toBeCalledTimes(1);
  });

  it("return an empty string when it does not match on a data type", () => {
    // @ts-ignore mockery
    const response = formatMessageContent(undefined);

    expect(response).toEqual("");
  });

  it("log an error when an array is provided", () => {
    // @ts-ignore mockery
    formatMessageContent(["hello", "world"]);

    expect(console.error).toBeCalledTimes(1);
  });
});
