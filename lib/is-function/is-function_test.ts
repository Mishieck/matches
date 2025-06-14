import { describe, it } from "@std/testing";
import { isFunction } from "./is-function.ts";
import { expect } from "@std/expect";

describe("isFunction", () => {
  it("should check if a value is a function", () => {
    expect(isFunction()(() => {})).toEqual(true);
    expect(isFunction()(function () {})).toEqual(true);
    expect(isFunction()(Number)).toEqual(true);
    expect(isFunction()({})).toEqual(false);
  });
});
