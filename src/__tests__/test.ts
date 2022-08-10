import { wrand } from "..";

describe("wrand", () => {
  it("should return a random number", () => {
    expect(wrand()).toBeTruthy();
  });
});
