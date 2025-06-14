import { describe, it } from "@std/testing";
import { isEmpty } from "./is-empty.ts";
import { expect } from "@std/expect";

describe("isEmpty", () => {
  it("should check if a given value is empty", () => {
    expect(isEmpty()([])).toEqual(true);
    expect(isEmpty()("")).toEqual(true);
    expect(isEmpty()(new Set())).toEqual(true);
    expect(isEmpty()(new Map())).toEqual(true);
    expect(isEmpty()([1])).toEqual(false);
  });
});
