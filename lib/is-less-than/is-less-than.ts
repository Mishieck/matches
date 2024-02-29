import { Inequable, IsMatchSame } from '../types/match.types.ts';

/**
 * Checks if one value is less than another.
 *
 * @param first - The first value to be used in the inequality.
 * @returns a function that takes another value and checks if the second value
 *   is less than the first.
 * @example
 * ```ts
 * isLessThan(1)(0) // true
 * isLessThan(1)(1) // false
 * ```
 */
export const isLessThan: IsMatchSame<Inequable> = first => second =>
  second < first;
