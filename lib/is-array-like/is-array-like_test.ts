import { describe, it } from "@std/testing";
import { isArrayLike } from "./is-array-like.ts";
import { expect } from "@std/expect";

describe("isArrayLike", () => {
  it("should check if a given value is an ArrayLike collection", () => {
    expect(isArrayLike()([])).toEqual(true);
    expect(isArrayLike()("")).toEqual(true);
    expect(isArrayLike()({})).toEqual(false);
  });
});
