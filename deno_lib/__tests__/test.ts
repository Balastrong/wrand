import { wrand } from "../index.ts";

describe("wrand", () => {
  it("should return a random number", () => {
    expect(wrand()).toBeTruthy();
  });
});
