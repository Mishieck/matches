import { isType } from '../is-type/is-type.ts';
import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is a boolean or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `boolean`.
 * @example
 * ```ts
 * isBoolean()(true) // true
 * isBoolean()(1) // false
 * ```
 */
export const isBoolean: IsMatchOne = () => isType('boolean');
