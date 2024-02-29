import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks if a value is falsy.
 *
 * @returns a function that takes any type of value and checks if the value is
 *   falsy.
 * @example
 * ```ts
 * isFalsy()(false) // true
 * isFalsy()(0) // true
 * isFalsy()('') // true
 * isFalsy()(null) // true
 * isFalsy()(undefined) // true
 * isFalsy()(NaN) // true
 * isFalse()(1) // false
 * ```
 */
export const isFalsy: IsMatchOne = () => value => !value;
