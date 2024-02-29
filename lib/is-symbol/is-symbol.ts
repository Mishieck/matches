import { isType } from '../is-type/is-type.ts';
import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is a symbol or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `symbol`.
 * @example
 * ```ts
 * isSymbol()(Symbol(1)) // true
 * isSymbol()(1) // false
 * ```
 */
export const isSymbol: IsMatchOne = () => isType('symbol');
