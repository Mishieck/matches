import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if an `ArrayLike` collection has a given length.
 *
 * @param length - The length to check against.
 * @returns a function that takes an `ArrayLike` collection and checks if
 *   the it has the specified length.
 * @example
 * ```ts
 * hasLength(1)([1]) // true
 * hasLength(1)([]) // false
 * ```
 */
export const hasLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length === length;
