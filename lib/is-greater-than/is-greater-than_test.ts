import { describe, it } from "@std/testing";
import { isGreaterThan } from "./is-greater-than.ts";
import { expect } from "@std/expect";

describe("isGreaterThan", () => {
  it("should check if given value is greater than another value", () => {
    expect(isGreaterThan(0)(1)).toEqual(true);
    expect(isGreaterThan(1)(1)).toEqual(false);
  });
});
