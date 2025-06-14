/**
 * @module
 *
 * A library for checking the nature of JavaScript values.
 *
 * @example
 * ```ts
 * import * as M from 'jsr:@mishieck/matches@0.2.2';
 *
 * M.equals(1)(1); // true
 * M.equals(1)(2); // false
 *
 * M.isArray()([]); // true
 * M.isArray()({}); // false
 *
 * M.contains(1)([1, 2]); // true
 * M.contains(1)([2, 3]); // false
 *
 * M.not(M.equals(1))(2); // true
 * M.not(M.equals(1))(1); // false
 * ```
 */

export * from "./lib/has-length/has-length.ts";
export * from "./lib/is-function/is-function.ts";
export * from "./lib/equals/equals.ts";
export * from "./lib/is-null/is-null.ts";
export * from "./lib/matches/matches.ts";
export * from "./lib/has-min-length/has-min-length.ts";
export * from "./lib/has-min-size/has-min-size.ts";
export * from "./lib/is-greater-than/is-greater-than.ts";
export * from "./lib/is-any/is-any.ts";
export * from "./lib/is-false/is-false.ts";
export * from "./lib/is-boolean/is-boolean.ts";
export * from "./lib/has-max-size/has-max-size.ts";
export * from "./lib/has-size/has-size.ts";
export * from "./lib/is-instance-of/is-instance-of.ts";
export * from "./lib/is-less-than-or-equal/is-less-than-or-equal.ts";
export * from "./lib/none/none.ts";
export * from "./lib/is-big-int/is-big-int.ts";
export * from "./lib/is-record/is-record.ts";
export * from "./lib/is-less-than/is-less-than.ts";
export * from "./lib/is-array/is-array.ts";
export * from "./lib/is-object/is-object.ts";
export * from "./lib/not/not.ts";
export * from "./lib/is-truthy/is-truthy.ts";
export * from "./lib/is-greater-than-or-equal/is-greater-than-or-equal.ts";
export * from "./lib/is-symbol/is-symbol.ts";
export * from "./lib/is-undefined/is-undefined.ts";
export * from "./lib/has-max-length/has-max-length.ts";
export * from "./lib/is-true/is-true.ts";
export * from "./lib/is-number/is-number.ts";
export * from "./lib/is-type/is-type.ts";
export * from "./lib/has-property/has-property.ts";
export * from "./lib/contains/contains.ts";
export * from "./lib/is-falsy/is-falsy.ts";
export * from "./lib/types/match.types.ts";
export * from "./lib/types/data.types.ts";
export * from "./lib/is-array-like/is-array-like.ts";
export * from "./lib/each-one/each-one.ts";
export * from "./lib/is-string/is-string.ts";
export * from "./lib/is-empty/is-empty.ts";
