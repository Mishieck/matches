import { isType } from '../is-type/is-type.ts';
import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is a function or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `function`.
 * @example
 * ```ts
 * isFunction()(() => {}) // true
 * isFunction()(Array) // true
 * isFunction()({}) // false
 * ```
 */
export const isFunction: IsMatchOne = () => isType('function');
