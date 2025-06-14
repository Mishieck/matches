import { describe, it } from "@std/testing";
import { isFalsy } from "./is-falsy.ts";
import { expect } from "@std/expect";

describe("isFalsy", () => {
  it("should check if a given value is falsy", () => {
    expect(isFalsy()(false)).toEqual(true);
    expect(isFalsy()("")).toEqual(true);
    expect(isFalsy()(null)).toEqual(true);
    expect(isFalsy()(undefined)).toEqual(true);
    expect(isFalsy()(true)).toEqual(false);
    expect(isFalsy()(1)).toEqual(false);
    expect(isFalsy()({})).toEqual(false);
    expect(isFalsy()([])).toEqual(false);
  });
});
