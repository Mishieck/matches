import { describe, it } from "@std/testing";
import { equals } from "../equals/equals.ts";
import { not } from "./not.ts";
import { expect } from "@std/expect/expect";

describe("not", () => {
  it("should invert checks", () => {
    expect(not(equals(true))(false)).toEqual(true);
    expect(not(equals(1))(2)).toEqual(true);
    expect(not(equals(1))(1)).toEqual(false);
  });
});
