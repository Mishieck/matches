import { describe, it } from "@std/testing";
import { isLessThanOrEqual } from "./is-less-than-or-equal.ts";
import { expect } from "@std/expect";

describe("isLessThanOrEqual", () => {
  it(
    "should check if given value is less than or equal to another value",
    () => {
      expect(isLessThanOrEqual(1)(0)).toEqual(true);
      expect(isLessThanOrEqual(1)(1)).toEqual(true);
      expect(isLessThanOrEqual(1)(2)).toEqual(false);
    },
  );
});
