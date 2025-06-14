import { describe, it } from "@std/testing";
import { isLessThan } from "./is-less-than.ts";
import { expect } from "@std/expect";

describe("isLessThan", () => {
  it("should check if given value is less than another value", () => {
    expect(isLessThan(1)(0)).toEqual(true);
    expect(isLessThan(1)(1)).toEqual(false);
  });
});
