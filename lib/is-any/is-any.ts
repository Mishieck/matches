import { IsMatchOne } from '../types/match.types.ts';

/**
 * It passes the test for any value.
 *
 * @returns a function that takes any kind of parameter and returns true.
 * @example
 * ```ts
 * isAny()(1) // true
 * isAny()('match') // true
 * isAny()(false) // true
 * isAny()(null) // true
 * isAny()(undefined) // true
 * ```
 */
export const isAny: IsMatchOne = () => _ => true;
