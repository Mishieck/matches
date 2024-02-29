import { Inequable, IsMatchSame } from '../types/match.types.ts';

/**
 * Checks if one value is less that or equal to another value.
 *
 * @param first - The first value to be used in the inequality.
 * @returns a function that takes the second value and checks if the second
 *   value is less that or equal to the first one.
 * @example
 * ```ts
 * isLessThanOrEqual(1)(0) // true
 * isLessThanOrEqual(1)(1) // true
 * isLessThanOrEqual(1)(2) // false
 * ```
 */
export const isLessThanOrEqual: IsMatchSame<Inequable> = first => second =>
  second <= first;
