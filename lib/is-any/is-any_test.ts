import { describe, it } from "@std/testing";
import { isAny } from "./is-any.ts";
import { expect } from "@std/expect";

describe("isAny", () => {
  it("should check if a value is on any type", () => {
    expect(isAny()(true)).toEqual(true);
    expect(isAny()("")).toEqual(true);
    expect(isAny()(1)).toEqual(true);
    expect(isAny()(1n)).toEqual(true);
    expect(isAny()({})).toEqual(true);
    expect(isAny()([])).toEqual(true);
    expect(isAny()(Symbol(1))).toEqual(true);
    expect(isAny()(null)).toEqual(true);
    expect(isAny()(undefined)).toEqual(true);
  });
});
