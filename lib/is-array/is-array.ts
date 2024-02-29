import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is an array or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is an array.
 * @example
 * ```ts
 * isArray()([]) // true
 * isArray()({}) // false
 * ```
 */
export const isArray: IsMatchOne = () => value => Array.isArray(value);
