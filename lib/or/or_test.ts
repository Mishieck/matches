import { describe, it } from "@std/testing";
import { expect } from "@std/expect/expect";
import { or } from "./or.ts";
import { isNumber } from "../is-number/is-number.ts";
import { isString } from "../is-string/is-string.ts";

describe("or", () => {
  it("should match any predicate", () => {
    const isNumberOrString = or([isNumber(), isString()]);
    expect(isNumberOrString(1)).toEqual(true);
    expect(isNumberOrString("MatchES")).toEqual(true);
    expect(isNumberOrString(true)).toEqual(false);
  });
});
