import { logIncomingMessageTitle } from "../../log-formatters/log-message-title";
import { getChatMessage } from "./get-chat-message";

// Mocks
jest.mock("../../cache/format-message-content/format-message-content", () => ({
  formatMessageContent: jest.fn((message: string) => message),
}));
jest.mock("../../log-formatters/log-message-title", () => ({
  logIncomingMessageTitle: jest.fn(),
}));

describe("getChatMessage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return undefined for invalid message", () => {
    const message = "invalid message";

    const chatMessage = getChatMessage(message);

    expect(chatMessage).toBeUndefined();
  });

  test("should extract chat message from message", () => {
    const message =
      "@badge-info=subscriber/1;badges=broadcaster/1,subscriber/0,sub-gifter/1;client-nonce=3bb9b96e62dd25c841f9097e8ee18530;color=;display-name=DollarDojo;emotes=;first-msg=0;flags=;id=ace2fbf5-fc70-4022-be00-60dee28c7819;mod=0;returning-chatter=0;room-id=889699487;subscriber=1;tmi-sent-ts=1680930778825;turbo=0;user-id=889699487;user-type= :dollardojo!dollardojo@dollardojo.tmi.twitch.tv PRIVMSG #dollardojo :wassup";

    const chatMessage = getChatMessage(message);

    expect(chatMessage).toEqual({
      displayName: "DollarDojo",
      mod: false,
      subscriber: true,
      username: "dollardojo",
      message: "wassup",
      emotes: [null],
      chatCommand: "",
    });

    expect(logIncomingMessageTitle).toHaveBeenCalledWith(
      "chat message received",
      "chat-message"
    );
  });
});
