import { describe, it } from "@std/testing";
import { isNull } from "./is-null.ts";
import { expect } from "@std/expect";

describe("isNull", () => {
  it("should check if a given value is null", () => {
    expect(isNull()(null)).toEqual(true);
    expect(isNull()(undefined)).toEqual(false);
    expect(isNull()(false)).toEqual(false);
  });
});
