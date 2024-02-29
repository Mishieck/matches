import { Inequable, IsMatchSame } from '../types/match.types.ts';

/**
 * Checks if one value is greater than another value.
 *
 * @param first - The first value to be used in the inequality.
 * @returns a function that takes the second value and checks if the second
 *   value is greater than the first one.
 * @example
 * ```ts
 * isGreaterThan(1)(2) // true
 * isGreaterThan(1)(1) // false
 * ```
 */
export const isGreaterThan: IsMatchSame<Inequable> = first => second =>
  second > first;
