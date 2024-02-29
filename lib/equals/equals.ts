import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if two values are equal or not.
 *
 * @param first - The first value to compare to.
 * @returns a function that takes the second value to compare to the first one.
 *   The function returns `true` if the two values are structurally an
 *   referentially equal, `false` otherwise.
 * @example
 * ```ts
 * equals(1)(1) // true
 * equals({})({}) // false
 * ```
 */
export const equals: IsMatch = first => second => first === second;
