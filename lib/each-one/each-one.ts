import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if every item in an `Iterable` passes a given check.
 *
 * @param isMatch - A function that takes an value and checks if meets
 *   a particular condition.
 * @returns a function that takes an `Iterable` and checks if every item
 *   passes the check done by `isMatch`.
 * @example
 * ```ts
 * eachOne(isNumber())([1, 2]) // true
 * eachOne(isString())([1, 'match']) // false
 * ```
 */
export const eachOne: IsMatch<ReturnType<IsMatch>, Iterable<unknown>> =
  isMatch => iterable => {
    for (const item of iterable) if (!isMatch(item)) return false;
    return true;
  };
