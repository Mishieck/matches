import { describe, it } from "@std/testing";
import { isArray } from "./is-array.ts";
import { expect } from "@std/expect";

describe("isArray", () => {
  it("should check if a given value is an array", () => {
    expect(isArray()([])).toEqual(true);
    expect(isArray()("")).toEqual(false);
  });
});
