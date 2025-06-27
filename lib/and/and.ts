import type { NaryHigherOrderPredicate } from "../types/match.types.ts";

/**
 * A higher order predicate that checks if a value matches all predicates in a
 * list of predicates.
 *
 * @example
 *
 * ```ts
 * const isBetween0And10 = and<number>([isGreaterThan(0), isLessThan(10)]);
 * isBetween0And10(2); // true
 * isBetween0And10(11); // false
 * isBetween0And10(0); // false
 * ```
 */
export const and: NaryHigherOrderPredicate = (matchList) => (value) => {
  for (const matches of matchList) if (!matches(value)) return false;
  return true;
};
