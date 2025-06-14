import { describe, it } from "@std/testing";
import { hasProperty } from "./has-property.ts";
import { expect } from "@std/expect";

describe("hasProperty", () => {
  it("should check if an object has a given property", () => {
    expect(hasProperty("property")({ property: "property" })).toEqual(true);
  });
});
