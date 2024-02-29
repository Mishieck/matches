import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if an `ArrayLike` collection has a given minimum length.
 *
 * @param length - The length to check against.
 * @returns a function that takes an `ArrayLike` collection and checks if
 *   it has at least the given length.
 * @example
 * ```ts
 * hasMinLength(1)([1]) // true
 * hasMinLength(1)([1, 2]) // true
 * hasMinLength(1)([]) // false
 * ```
 */
export const hasMinLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length >= length;
