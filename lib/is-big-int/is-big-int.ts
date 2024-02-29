import { isType } from '../is-type/is-type.ts';
import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks whether a value is a bigint or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `bigint`.
 * @example
 * ```ts
 * isBigInt()(1n) // true
 * isBigInt()(1) // false
 * ```
 */
export const isBigInt: IsMatchOne = () => isType('bigint');
