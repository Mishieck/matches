import { IsMatch, MapOrSet } from '../types/match.types.ts';

/**
 * Checks if a `Map` or `Set` has the given size.
 *
 * @param size - The size to test against.
 * @returns a function that takes a `Map` or `Set` and checks if it has the
 *   given size.
 * @example
 * ```ts
 * hasSize(1)(new Set([1])) // true
 * hasSize(1)(new Map([[1, 1]])) // true
 * hasSize(1)(new Set()) // false
 * ```
 */
export const hasSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size === size;
