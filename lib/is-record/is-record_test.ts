import { describe, it } from "@std/testing";
import { isRecord } from "./is-record.ts";
import { expect } from "@std/expect/expect";

describe("isRecord", () => {
  it("should check if a given value is a record", () => {
    expect(isRecord()({})).toEqual(true);
    expect(isRecord()(null)).toEqual(false);
    expect(isRecord()([])).toEqual(false);
    expect(isRecord()(new String(""))).toEqual(false);
  });
});
