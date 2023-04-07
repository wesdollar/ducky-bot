import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";
import { getUserJoinedChat } from "./get-user-joined-chat";

jest.mock("../../log-formatters/log-message-title", () => ({
  logIncomingMessageTitle: jest.fn(),
}));

const username = "duckydojo";
const string = `:${username}!${username}@${username}.tmi.twitch.tv JOIN #dollardojo`;

describe("get user joined chat session", () => {
  it("should return the user's username", () => {
    const response = getUserJoinedChat(string);

    expect(response).toEqual(username);
  });

  it("should call logMessageTitle", () => {
    getUserJoinedChat(string);

    expect(logIncomingMessageTitle).toBeCalled();
  });

  it("should not match on string that does not match the regex pattern", () => {
    const result = getUserJoinedChat("this is my new string");

    expect(result).toBe(null);
  });
});
