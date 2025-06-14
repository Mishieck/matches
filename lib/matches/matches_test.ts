import { describe, it } from "@std/testing";
import { matches } from "./matches.ts";
import { expect } from "@std/expect/expect";

describe("matches", () => {
  it("should checks if a given value matches a particular regex", () => {
    expect(matches(/\w/)("Match")).toEqual(true);
    expect(matches(/\d/)("Match")).toEqual(false);
  });
});
