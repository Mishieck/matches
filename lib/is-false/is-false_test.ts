import { describe, it } from "@std/testing";
import { isFalse } from "./is-false.ts";
import { expect } from "@std/expect";

describe("isFalse", () => {
  it("should check if a given value is false", () => {
    expect(isFalse()(false)).toEqual(true);
    expect(isFalse()(0)).toEqual(false);
  });
});
