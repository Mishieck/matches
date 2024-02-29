import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks if an `Iterable` is empty.
 *
 * @returns a function that takes an `Iterable` and checks if it is empty.
 * @example
 * ```ts
 * isEmpty()([]) // true
 * isEmpty()('') // true
 * isEmpty())([1]) // false
 * ```
 */
export const isEmpty: IsMatchOne<Iterable<unknown>> = () => iterable => {
  for (const _ of iterable) return false;
  return true;
};
