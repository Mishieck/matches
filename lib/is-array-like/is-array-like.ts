import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is an array-like collection or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is an `ArrayLike` collection.
 * @example
 * ```ts
 * isArrayLike()([]) // true
 * isArrayLike()('') // true
 * isArrayLike()({ length: 0 }) // true
 * isArrayLike()({}) // false
 * ```
 */
export const isArrayLike: IsMatchOne = () => value =>
  typeof value === 'string' ||
  (typeof value === 'object' && value !== null && 'length' in value);
