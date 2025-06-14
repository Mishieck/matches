import { describe, it } from "@std/testing";
import { equals } from "./equals.ts";
import { expect } from "@std/expect";

describe("equals", () => {
  it("should check if a given value is equal to another value", () => {
    expect(equals(true)(true)).toEqual(true);
    expect(equals(true)(false)).toEqual(false);
  });
});
