import { describe, it } from "@std/testing";
import { isBigInt } from "./is-big-int.ts";
import { expect } from "@std/expect";

describe("isBigInt", () => {
  it("should check if a value is a big int", () => {
    expect(isBigInt()(1n)).toEqual(true);
    expect(isBigInt()(1)).toEqual(false);
  });
});
