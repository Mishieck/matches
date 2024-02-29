import { Inequable, IsMatchSame } from '../types/match.types.ts';

/**
 * Checks if one value is greater than or equal to another value.
 *
 * @param first - The first value to be used in the inequality.
 * @returns a function that takes the second value and checks if the second
 *   value is greater that or equal to the first one.
 * @example
 * ```ts
 * isGreaterThanOrEqual(1)(2) // true
 * isGreaterThanOrEqual(1)(1) // true
 * isGreaterThanOrEqual(1)(0) // false
 * ```
 */
export const isGreaterThanOrEqual: IsMatchSame<Inequable> = first => second =>
  second >= first;
