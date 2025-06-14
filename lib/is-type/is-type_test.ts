import { describe, it } from "@std/testing";
import { isType } from "./is-type.ts";
import { expect } from "@std/expect/expect";

describe("isType", () => {
  it("should check if a value is of a particular type", () => {
    expect(isType("bigint")(1n)).toEqual(true);
    expect(isType("boolean")(true)).toEqual(true);
    expect(isType("function")(() => {})).toEqual(true);
    expect(isType("object")({})).toEqual(true);
    expect(isType("number")(1)).toEqual(true);
    expect(isType("string")("")).toEqual(true);
    expect(isType("symbol")(Symbol(1))).toEqual(true);
    expect(isType("undefined")(undefined)).toEqual(true);
  });
});
