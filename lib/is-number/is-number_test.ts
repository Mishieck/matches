import { describe, it } from "@std/testing";
import { isNumber } from "./is-number.ts";
import { expect } from "@std/expect";

describe("isNumber", () => {
  it("should check if a given value is a number", () => {
    expect(isNumber()(1)).toEqual(true);
    expect(isNumber()(NaN)).toEqual(true);
    expect(isNumber()(1n)).toEqual(false);
  });
});
