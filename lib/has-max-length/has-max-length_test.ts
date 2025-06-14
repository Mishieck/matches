import { describe, it } from "@std/testing";
import { hasMaxLength } from "./has-max-length.ts";
import { expect } from "@std/expect";

describe("hasMaxLength", () => {
  it(
    "should check if an ArrayLike collection has length less than or equal to specified value",
    () => {
      expect(hasMaxLength(1)([1])).toEqual(true);
      expect(hasMaxLength(4)("code")).toEqual(true);
    },
  );
});
