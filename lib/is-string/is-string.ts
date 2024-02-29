import { isType } from '../is-type/is-type.ts';
import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is a string or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `string`.
 * @example
 * ```ts
 * isString()('match') // true
 * isString()(1) // false
 * ```
 */
export const isString: IsMatchOne = () => isType('string');
