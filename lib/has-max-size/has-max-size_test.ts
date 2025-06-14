import { describe, it } from "@std/testing";
import { hasMaxSize } from "./has-max-size.ts";
import { expect } from "@std/expect";

describe("hasMaxSize", () => {
  it(
    "should check if a set or map has size that is less than or equal to a given size",
    () => {
      expect(hasMaxSize(1)(new Set([1]))).toEqual(true);
      expect(hasMaxSize(1)(new Map([[1, 1]]))).toEqual(true);
    },
  );
});
