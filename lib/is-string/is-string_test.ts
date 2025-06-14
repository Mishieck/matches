import { describe, it } from "@std/testing";
import { isString } from "./is-string.ts";
import { expect } from "@std/expect";

describe("isString", () => {
  it("should check if a given value is a string", () => {
    expect(isString()("")).toEqual(true);
    expect(isString()(true)).toEqual(false);
    expect(isString()(new String(""))).toEqual(false);
  });
});
