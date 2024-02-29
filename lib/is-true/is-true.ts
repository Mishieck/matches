import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is true or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is `true`.
 * @example
 * ```ts
 * isTrue()(true) // true
 * isTrue()(false) // false
 * isTrue()(1) // false
 * ```
 */
export const isTrue: IsMatchOne = () => value => value === true;
