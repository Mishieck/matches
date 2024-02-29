import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if a string matches a given regex.
 *
 * @param regex - The regex to be matched against.
 * @returns a function that takes a `string` and checks if the `string`
 *   matches the `regex`.
 * @example
 * ```ts
 * matches(/\d/)('1') // true
 * matches(/\d/)('match') // false
 * ```
 */
export const matches: IsMatch<RegExp, string> = regex => str => regex.test(str);
