import { contains } from "../contains/contains.ts";
import { equals } from "../equals/equals.ts";
import { none } from "./none.ts";
import type { Compare } from "../types/match.types.ts";
import { describe, it } from "@std/testing";
import { expect } from "@std/expect";

describe("none", () => {
  it(
    "should check if none of the items in an iterable satisfies a particular condition",
    () => {
      expect(none(equals(2))([1])).toEqual(true);
      expect(none(equals(2))([1, 1])).toEqual(true);
      expect(none(equals("b"))("cc")).toEqual(true);
      expect(none(equals(2))(new Set([1, 1]))).toEqual(true);
      expect(none(equals(1))(new Set([1, 1]))).toEqual(false);
      expect(none(contains(2) as Compare)(new Map([["a", 1]]))).toEqual(true);
      expect(none(contains(1) as Compare)(new Map([["a", 1]]))).toEqual(false);
      expect(none(equals(1))([1, 2])).toEqual(false);
    },
  );
});
