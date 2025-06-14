import { contains } from "./contains.ts";
import { describe, it } from "@std/testing";
import { expect } from "@std/expect";

describe("contains", () => {
  it("should check if an iterable contains a particular item", () => {
    expect(contains(1)([1])).toEqual(true);
    expect(contains("c")("code")).toEqual(true);
    expect(contains(1)(new Set([1]))).toEqual(true);
    expect(contains(0)(new Map([[1, 0]]))).toEqual(true);
    expect(contains(2)([1])).toEqual(false);
  });
});
