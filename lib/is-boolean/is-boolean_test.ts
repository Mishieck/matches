import { describe, it } from "@std/testing";
import { isBoolean } from "./is-boolean.ts";
import { expect } from "@std/expect";

describe("isBoolean", () => {
  it("should check if a given value is boolean", () => {
    expect(isBoolean()(true)).toEqual(true);
    expect(isBoolean()(false)).toEqual(true);
    expect(isBoolean()("true")).toEqual(false);
  });
});
