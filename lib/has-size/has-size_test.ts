import { describe, it } from "@std/testing";
import { hasSize } from "./has-size.ts";
import { expect } from "@std/expect";

describe("hasSize", () => {
  it("should check if a set or map has a given size", () => {
    expect(hasSize(0)(new Set())).toEqual(true);
    expect(hasSize(1)(new Set([1]))).toEqual(true);
    expect(hasSize(0)(new Map())).toEqual(true);
    expect(hasSize(1)(new Map([[1, 1]]))).toEqual(true);
  });
});
