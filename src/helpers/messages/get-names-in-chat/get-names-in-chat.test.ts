import { getNamesInChat } from "./get-names-in-chat";

jest.mock("../../log-formatters/log-message-title", () => ({
  logMessageTitle: jest.fn(),
}));

const string1 = `:mrpetersburgy!mrpetersburgy@mrpetersburgy.tmi.twitch.tv JOIN #dollardojo
:streamelements!streamelements@streamelements.tmi.twitch.tv JOIN #dollardojo`;

const string2 = ":ronni!ronni@ronni.tmi.twitch.tv JOIN #dollardojo";

describe("get names in chat function", () => {
  it("should return an array of users when using a compound string", () => {
    const result = getNamesInChat(string1);

    expect(result).toEqual(["mrpetersburgy", "streamelements"]);
  });

  it("should return an array of user when using a basic string", () => {
    const result = getNamesInChat(string2);

    expect(result).toEqual(["ronni"]);
  });
});
