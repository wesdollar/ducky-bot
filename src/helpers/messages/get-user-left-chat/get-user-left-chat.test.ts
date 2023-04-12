import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";
import { getUserLeftChat } from "./get-user-left-chat";

jest.mock("../../log-formatters/log-message-title", () => ({
  logMessageTitle: jest.fn(),
}));

const username = "duckydojo";
const string = `:${username}!${username}@${username}.tmi.twitch.tv PART #dollardojo`;

jest.mock("../../log-formatters/log-message-title", () => ({
  logIncomingMessageTitle: jest.fn(),
}));

// TODO: add additional coverage
describe("get user who left chat", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shouldcall logIncomingMessageTitle", () => {
    getUserLeftChat(string);

    expect(logIncomingMessageTitle).toBeCalled();
  });

  it("it should return the user's name", () => {
    const user = getUserLeftChat(string);

    expect(user).toEqual(username);
  });

  it("it should return undefined when string doesn't match", () => {
    const user = getUserLeftChat("whatever");

    expect(user).toBeUndefined();
  });
});
