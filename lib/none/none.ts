import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if a none of the items in an `Iterable` passes a given check.
 *
 * @param isMatch - A function that takes a value and checks if it meets a
 *   particular condition.
 * @returns a function that takes an `Iterable` and checks if none of the
 *   items passes the check done by `isMatch`.
 * @example
 * ```ts
 * none(isString())([1, 2]) // true
 * none(isNumber())([1, 'match']) // false
 * ```
 */
export const none: IsMatch<ReturnType<IsMatch>, Iterable<unknown>> =
  isMatch => iterable => {
    for (const item of iterable) if (isMatch(item)) return false;
    return true;
  };
