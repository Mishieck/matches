import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if a value is an instance of a given class.
 *
 * @param Constructor - The class to check against.
 * @returns a function that takes a value of any type and checks if it is an
 *   instance of the given class.
 * @example
 * ```ts
 * isInstanceOf(Array)([]) // true
 * isInstanceOf(Object)({}) // true
 * isInstanceOf(Array)({}) // false
 * isInstanceOf(String)('') // false
 * ```
 */
export const isInstanceOf: IsMatch<
  // deno-lint-ignore ban-types
  Function
> = Constructor => value => value instanceof Constructor;
