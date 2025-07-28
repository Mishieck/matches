import * as M from "jsr:@mishieck/matches@0.4.3"; // Deno
import { assert, assertEquals } from "@std/assert";
import { describe } from "@std/testing";

describe("Predicates", () => {
  assert(M.equals(1)(1));
  assert(!M.equals(1)(2));

  assert(M.isArray()([]));
  assert(!M.isArray()({}));

  assert(M.contains(1)([1, 2]));
  assert(!M.contains(1)([2, 3]));

  assert(M.not(M.equals(1))(2));
  assert(!M.not(M.equals(1))(1));
});

describe("Inline Switch Statements", () => {
  type Suffix = "B" | "M" | "K" | "";

  const suffix = ((_): Suffix => {
    switch (true) {
      case M.isGreaterThanOrEqual(1_000_000_000)(_):
        return "B";
      case M.isGreaterThanOrEqual(1_000_000)(_):
        return "M";
      case M.isGreaterThanOrEqual(1_000)(_):
        return "K";
      default:
        return "";
    }
  })(1024);

  assertEquals(suffix, "K");

  type Data = { id: string };

  type Result = {
    data: Array<Data> | null;
    error: Error | null;
  };

  type State = "loading" | "content" | "empty" | "error";

  const state = (({ data, error }: Result): State => {
    if (M.isInstanceOf(Error)(error)) return "error"; // `Failure`
    else if (M.isNull()(data)) return "loading"; // `Success["data"] extends null`
    else if (M.isEmpty()(data!)) return "empty"; // `Success["data"] extends []`
    else return "content"; // `Success["data"] extends [Data, ...Array<Data>]`
  })({ data: null, error: null });

  assertEquals(state, "loading");
});

