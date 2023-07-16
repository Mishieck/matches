import * as regexes from './regexes.ts';

export type PatternValueGetter<Value = unknown> = (pattern: string) => Value;

/**
 * Gets the parts of a string that matches the groups in a regex.
 *
 * @param pattern - A string to match.
 * @param regex - A regex to match against. The regex must contain groups.
 * @returns An array that contains all the matches.
 * @example
 * ```ts
 * const regex = /(\d+)/;
 * console.log(getMatches('1', regex)); // ['1']
 * ```
 */
export const getMatches = (pattern: string, regex: RegExp) =>
  (pattern.match(regex) || []).slice(1);

/**
 * Gets the value from a literal pattern.
 *
 * @param value - A string pattern.
 * @returns A value of the pattern.
 * @example
 * ```ts
 * console.log(getLiteral('1')); // 1
 * console.log(getLiteral('1n')); // 1n
 * console.log(getLiteral('"match"')); // 'match'
 * ```
 */
export const getLiteral = (value: string) => {
  const func = new Function(`return ${value};`);
  return func();
};

export const getRegex = (literal: string) => {
  const [regex, flags] = getMatches(literal, regexes.regexPattern);
  return new RegExp(regex, flags);
};

export const getObjectProperty: PatternValueGetter<string> = pattern =>
  getMatches(pattern, regexes.objectPropertyPattern)[0];

export const getObjectProperties: PatternValueGetter<
  [string, string]
> = pattern => {
  const [property, rest] = getMatches(pattern, regexes.objectPropertiesPattern);
  return [property, rest];
};
