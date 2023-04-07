import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";
import { getChatMessage } from "./get-chat-message";

jest.mock("../../log-formatters/log-message-title", () => ({
  logIncomingMessageTitle: jest.fn(),
}));

const username = "dollardojo";
const message1 = "bleedPurple";
const message2 =
  "a full sentence to make sure that we are getting the entire thing out of our regex";

const simpleString = `:${username}!${username}@${username}.tmi.twitch.tv PRIVMSG #dollardojo :${message1}`;

const complexString = `:${username}!${username}@${username}.tmi.twitch.tv PRIVMSG #dollardojo :${message2}`;

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

    expect(logIncomingMessageTitle).toBeCalled();
  });

  // 0-18;first-msg=0;flags=;id=e51b86af-e9ad-457d-afa8-287f283e5ee6;mod=0;returning-chatter=0;room-id=889699487;subscriber=1;tmi-sent-ts=1680725769195;turbo=0;user-id=889699487;user-type= :dollardojo
  // it should not regex match on the above string
});
