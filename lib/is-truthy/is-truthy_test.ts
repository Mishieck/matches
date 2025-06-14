import { describe, it } from "@std/testing";
import { isTruthy } from "./is-truthy.ts";
import { expect } from "@std/expect";

describe("isTruthy", () => {
  it("should check if a given value is truthy", () => {
    expect(isTruthy()(true)).toEqual(true);
    expect(isTruthy()(1)).toEqual(true);
    expect(isTruthy()({})).toEqual(true);
    expect(isTruthy()([])).toEqual(true);
    expect(isTruthy()(false)).toEqual(false);
    expect(isTruthy()("")).toEqual(false);
    expect(isTruthy()(null)).toEqual(false);
    expect(isTruthy()(undefined)).toEqual(false);
  });
});
