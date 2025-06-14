import { describe, it } from "@std/testing";
import { isTrue } from "./is-true.ts";
import { expect } from "@std/expect/expect";

describe("isTrue", () => {
  it("should check if a given value is true", () => {
    expect(isTrue()(true)).toEqual(true);
    expect(isTrue()(false)).toEqual(false);
  });
});
