import { getTimestamp } from "./get-timestamp";

describe("get the current imestamp", () => {
  const mockTimestamp = "2022-05-02T10:00:00Z";

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date(mockTimestamp));
  });

  test("returns the correct time in New York", () => {
    expect(getTimestamp()).toEqual("5/2/2022, 6:00:00 AM");
  });
});
