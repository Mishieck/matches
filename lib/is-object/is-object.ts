import { isType } from '../is-type/is-type.ts';
import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is a object or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `object`.
 * @example
 * ```ts
 * isObject()({}) // true
 * isObject()([]) // true
 * isObject()(null) // true
 * isObject()(1) // false
 * ```
 */
export const isObject: IsMatchOne = () => isType('object');
