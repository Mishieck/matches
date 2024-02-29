import { IsMatch, MapOrSet } from '../types/match.types.ts';

/**
 * Checks if an `Iterable` has a given item.
 * @param value - The value to check for in the `Iterable`.
 * @returns a function that takes an `Iterable` and checks if the given value
 *   is the `Iterable`.
 * @example
 * ```ts
 * contains(1)([1, 2]) // true
 * contains(1)([2]) // false
 * contains({})([{}]) // false
 * ```
 */
export const contains: IsMatch<unknown, Iterable<unknown>> =
  value => collection => {
    const iterable: Iterable<unknown> = [Set, Map].some(
      Constructor => collection instanceof Constructor
    )
      ? (collection as MapOrSet).values()
      : collection;

    for (const item of iterable) if (item === value) return true;
    return false;
  };
