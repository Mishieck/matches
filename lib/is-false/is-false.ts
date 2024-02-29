import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is `false` or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is `false`.
 * @example
 * ```ts
 * isFalse()(false) // true
 * isFalse()(true) // false
 * isFalse()(0) // false
 * ```
 */
export const isFalse: IsMatchOne = () => value => value === false;
