import { IsMatch, MapOrSet } from '../types/match.types.ts';

/**
 * Checks if a `Map` or `Set` has a given maximum size.
 * @param size - The size to test against.
 * @returns a function that takes a `Map` or `Set` and checks if it has a size
 *   that is at most the given size.
 * @example
 * ```ts
 * hasMaxSize(1)(new Set([1])) // true
 * hasMaxSize(1)(new Map([[1, 1]])) // true
 * hasMaxSize(1)(new Set()) // true
 * hasMaxSize(1)(new Set([1, 2])) // false
 * ```
 */
export const hasMaxSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size <= size;
