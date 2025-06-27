import type { NaryHigherOrderPredicate } from "../types/match.types.ts";

/**
 * A higher order predicate that checks if a value matches any predicate
 * in a list of predicates.
 *
 * @example
 *
 * ```ts
 * const isNumberOrString = or([isNumber(), isString()]);
 * isNumberOrString(1); // true
 * isNumberOrString(true); // false
 * ```
 */
export const or: NaryHigherOrderPredicate = (matchList) => (value) => {
  for (const matches of matchList) if (matches(value)) return true;
  return false;
};
