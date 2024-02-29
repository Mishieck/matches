import { IsMatchOne } from '../types/match.types.ts';

/**
 * Checks if value is `undefined`.
 *
 * @returns a function that takes any type of value and checks if the value is
 *   `undefined`.
 * @example
 * ```ts
 * isUndefined()(undefined) // true
 * isUndefined()(null) // false
 * isUndefined()(0) // false
 * ```
 */
export const isUndefined: IsMatchOne = () => value => value === undefined;
