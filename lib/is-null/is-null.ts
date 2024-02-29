import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks if a value is `null`.
 *
 * @returns a function that takes any type of value and checks if the value is
 *   `null`.
 * @example
 * ```ts
 * isNull()(null) // true
 * isNull()(undefined) // false
 * isNull()(0) // false
 * ```
 */
export const isNull: IsMatchOne = () => value => value === null;
