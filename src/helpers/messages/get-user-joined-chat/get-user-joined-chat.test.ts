import { logMessageTitle } from "../../log-formatters/log-message-title";
import { getUserJoinedChat } from "./get-user-joined-chat";

jest.mock("../../log-formatters/log-message-title", () => ({
  logMessageTitle: jest.fn(),
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

    expect(logMessageTitle).toBeCalled();
  });
});
