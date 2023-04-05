import { logMessageTitle } from "../../log-formatters/log-message-title";
import { getChatMessage } from "./get-chat-message";

jest.mock("../../log-formatters/log-message-title", () => ({
  logMessageTitle: jest.fn(),
}));

const username = "dollardojo";
const message1 = "bleedPurple";
const message2 =
  "a full sentence to make sure that we are getting the entire thing out of our regex";

const simpleString = `:${username}!${username}@${username}.tmi.twitch.tv PRIVMSG #bar :${message1}`;

const complexString = `:${username}!${username}@${username}.tmi.twitch.tv PRIVMSG #bar :${message2}`;

describe("get chat messages", () => {
  it("should return an object with a user and message property on a simple, one-word message", () => {
    const response = getChatMessage(simpleString);

    expect(response).toEqual({
      user: username,
      message: message1,
    });
  });

  it("should return an object with a user and message property on a complex string that is a full sentence", () => {
    const response = getChatMessage(complexString);

    expect(response).toEqual({
      user: username,
      message: message2,
    });
  });

  it("called logMessageTitle", () => {
    getChatMessage(complexString);

    expect(logMessageTitle).toBeCalled();
  });
});
