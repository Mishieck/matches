import { describe, it } from "@std/testing";
import { hasLength } from "./has-length.ts";
import { expect } from "@std/expect";

describe("hasLength", () => {
  it(
    "should check if an ArrayLike collection has length equal to a given value",
    () => {
      expect(hasLength(0)([])).toEqual(true);
      expect(hasLength(1)([1])).toEqual(true);
      expect(hasLength(0)("")).toEqual(true);
      expect(hasLength(4)("code")).toEqual(true);
    },
  );
});
