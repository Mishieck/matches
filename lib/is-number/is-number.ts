import { isType } from '../is-type/is-type.ts';
import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is a number or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `number`.
 * @example
 * ```ts
 * isNumber()(1) // true
 * isNumber()('match') // false
 * ```
 */
export const isNumber: IsMatchOne = () => isType('number');
