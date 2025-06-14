import { describe, it } from "@std/testing";
import { isGreaterThanOrEqual } from "./is-greater-than-or-equal.ts";
import { expect } from "@std/expect";

describe("isGreaterThanOrEqual", () => {
  it(
    "should check if given value is greater than or equal to another value",
    () => {
      expect(isGreaterThanOrEqual(1)(2)).toEqual(true);
      expect(isGreaterThanOrEqual(1)(1)).toEqual(true);
      expect(isGreaterThanOrEqual(1)(0)).toEqual(false);
    },
  );
});
