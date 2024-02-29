import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks if a value is truthy.
 *
 * @returns a function that takes any type of value and checks if the value is
 *   truthy.
 * @example
 * ```ts
 * isTruthy()(true) // true
 * isTruthy()(1) // true
 * isTruthy()(false) // false
 * isTruthy()(0) // false
 * isTruthy()('') // false
 * isTruthy()(null) // false
 * isTruthy()(undefined) // false
 * isTruthy()(NaN) // false
 * ```
 */
export const isTruthy: IsMatchOne = () => value => !!value;
