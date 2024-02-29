import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if a given value fails a given check. It negates the result of a
 *   check.
 *
 * @param isMatch - A function that takes a value and checks if it passes a
 *   particular condition.
 * @returns a function that takes a value and checks if it fails a the check
 *   done by `isMatch`.
 * @example
 * ```ts
 * not(isNumber())('match') // true
 * not(isNumber())(1) // false
 * ```
 */
export const not: IsMatch<ReturnType<IsMatch>> = isMatch => value =>
  !isMatch(value);
