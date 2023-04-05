import { getUserLeftChat } from "./get-user-left-chat";

jest.mock("../../log-formatters/log-message-title", () => ({
  logMessageTitle: jest.fn(),
}));

const username = "duckydojo";
const string = `:${username}!${username}@${username}.tmi.twitch.tv PART #dollardojo`;

describe("get user who left chat", () => {
  it("should return the user's username", () => {
    const result = getUserLeftChat(string);

    expect(result).toEqual(username);
  });
});
