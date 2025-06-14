import { describe, it } from "@std/testing";
import { isObject } from "./is-object.ts";
import { expect } from "@std/expect/expect";

describe("isObject", () => {
  it("should check if a given value is an object", () => {
    expect(isObject()({})).toEqual(true);
    expect(isObject()(null)).toEqual(true);
    expect(isObject()([])).toEqual(true);
    expect(isObject()(true)).toEqual(false);
  });
});
