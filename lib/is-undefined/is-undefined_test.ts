import { describe, it } from "@std/testing";
import { isUndefined } from "./is-undefined.ts";
import { expect } from "@std/expect";

describe("isUndefined", () => {
  it("should check if a given value is undefined", () => {
    expect(isUndefined()(undefined)).toEqual(true);
    expect(isUndefined()(null)).toEqual(false);
    expect(isUndefined()(false)).toEqual(false);
  });
});
