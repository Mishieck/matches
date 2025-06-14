import { describe, it } from "@std/testing";
import { isSymbol } from "./is-symbol.ts";
import { expect } from "@std/expect/expect";

describe("isSymbol", () => {
  it("should check if a given value is a symbol", () => {
    expect(isSymbol()(Symbol(1))).toEqual(true);
    expect(isSymbol()(1)).toEqual(false);
  });
});
