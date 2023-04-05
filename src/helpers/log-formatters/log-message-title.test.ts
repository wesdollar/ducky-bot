import { logMessageTitle } from "./log-message-title";

console.log = jest.fn((data) => data);

describe("log message title to standardize our message titles", () => {
  it("it should call console log with the appropriate text", () => {
    const testMessage = "pretty lights";

    logMessageTitle(testMessage);

    expect(console.log).toBeCalled();
    expect(console.log).toBeCalledWith(`\n:: ${testMessage} ::`);
  });
});
