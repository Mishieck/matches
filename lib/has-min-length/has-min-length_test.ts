import { describe, it } from "@std/testing";
import { hasMinLength } from "./has-min-length.ts";
import { expect } from "@std/expect";

describe("hasMinLength", () => {
  it(
    "should check if an ArrayLike collection has length greater than or equal to specified value",
    () => {
      expect(hasMinLength(1)([1])).toEqual(true);
      expect(hasMinLength(3)("code")).toEqual(true);
    },
  );
});
