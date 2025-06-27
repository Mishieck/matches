import { describe, it } from "@std/testing";
import { expect } from "@std/expect/expect";
import { and } from "./and.ts";
import { isGreaterThan } from "../is-greater-than/is-greater-than.ts";
import { isLessThan } from "../is-less-than/is-less-than.ts";

describe("or", () => {
  it("should match any predicate", () => {
    const isBetween0And10 = and<number>([isGreaterThan(0), isLessThan(10)]);
    expect(isBetween0And10(5)).toEqual(true);
    expect(isBetween0And10(11)).toEqual(false);
    expect(isBetween0And10(0)).toEqual(false);
  });
});
