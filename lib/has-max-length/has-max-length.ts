import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if an `ArrayLike` collection has a given maximum length.
 *
 * @param length - The length to check against.
 * @returns a function that takes an `ArrayLike` collection and checks if
 *   it has a length that is at most the given length.
 * @example
 * ```ts
 * hasMaxLength(1)([1]) // true
 * hasMaxLength(1)([]) // true
 * hasMaxLength(1)([1, 2]) // false
 * ```
 */
export const hasMaxLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length <= length;
