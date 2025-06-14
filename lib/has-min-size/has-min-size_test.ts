import { describe, it } from "@std/testing";
import { hasMinSize } from "./has-min-size.ts";
import { expect } from "@std/expect";

describe("hasMinSize", () => {
  it(
    "should check if a set or map has size greater than or equal to a given size",
    () => {
      expect(hasMinSize(1)(new Set([1]))).toEqual(true);
      expect(hasMinSize(1)(new Map([[1, 1]]))).toEqual(true);
    },
  );
});
