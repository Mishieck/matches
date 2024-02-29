import { IsMatch, MapOrSet } from '../types/match.types.ts';

/**
 * Checks if a `Map` or `Set` has a given minimum size.
 *
 * @param size - The size to check against.
 * @returns a function that takes a `Map` or `Set` and checks if it has the
 *   given size.
 * @example
 * ```ts
 * hasMinSize(1)(new Set([1])) // true
 * hasMinSize(1)(new Map([[1, 1]])) // true
 * hasMinSize(1)(new Set()) // false
 * ```
 */
export const hasMinSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size >= size;
