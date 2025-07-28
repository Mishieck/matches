import { describe } from "@std/testing";
import * as M from "jsr:@mishieck/matches@0.4.3";

describe("mod", () => {
  M.equals(1)(1); // true
  M.equals(1)(2); // false

  M.isArray()([]); // true
  M.isArray()({}); // false

  M.contains(1)([1, 2]); // true
  M.contains(1)([2, 3]); // false

  M.not(M.equals(1))(2); // true
  M.not(M.equals(1))(1); // false
});
