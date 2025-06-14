import { describe, it } from "@std/testing";
import { isInstanceOf } from "./is-instance-of.ts";
import { expect } from "@std/expect";

describe("isInstanceOf", () => {
  it(
    "should check if a given value is an instance of a given class",
    () => {
      expect(isInstanceOf(Object)({})).toEqual(true);
      expect(isInstanceOf(Object)([])).toEqual(true);
      expect(isInstanceOf(Array)([])).toEqual(true);
      expect(isInstanceOf(String)(new String(""))).toEqual(true);
      expect(isInstanceOf(Object)(true)).toEqual(false);
    },
  );
});
