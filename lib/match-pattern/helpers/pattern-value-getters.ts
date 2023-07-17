import * as regexes from './regexes.ts';

export type PatternValueGetter<Value = unknown> = (pattern: string) => Value;
export type BinaryTerms = [string | number, string, string];

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

/**
 * Creates a regex from a string.
 *
 * @param literal - A string containing a regex literal.
 * @returns a regex.
 * @example
 * ```ts
 * getRegex('/\\b/'); // /\b/
 * getRegex('/[a-z]/i'); // /[a-z]/i
 * ```
 */
export const getRegex = (literal: string) => {
  const [regex, flags] = getMatches(literal, regexes.regexPattern);
  return new RegExp(regex, flags);
};

/**
 * Gets the terms in a binary expression.
 *
 * @param pattern - A string pattern containing a binary expression.
 * @returns an array containing the 3 terms of a binary expression. The first
 *   value the left operand. The second value is the operator. The third value
 *   is the right operand. If the left operand is an identifier, an empty
 *   string is set as the left operand in the output. If the left operand is
 *   a property accessor, the property is set to the left operand in the
 *   result. The second operand is evaluated in the result.
 * @example
 * ```ts
 * getBinaryTerms('value < 1'); // ['', '<', 1]
 * getBinaryTerms('object.property === 'match'); // ['property', '===', 'match']
 * getBinaryTerms('object["property"] === 'match'); // ['property', '===', 'match']
 * getBinaryTerms('array[0] > 1'); // [0, '>' 1]
 * getBinaryTerms('value === null'); // ['', '===', null]
 * ```
 */
export const getBinaryTerms: PatternValueGetter<BinaryTerms> = pattern => {
  const [left, operator, right] = getMatches(
    pattern,
    regexes.binaryOperationPattern
  );

  const propertyAccessPattern = /(\.[_a-zA-Z$][\w$]*|\[.+\])/;
  // console.log({ operator });
  // console.log({ right });
  const value = getLiteral(right);

  let property: string | number = left.replace(/^[\w$]+/, '');

  if (propertyAccessPattern.test(left)) {
    if (property.startsWith('.')) property = property.substring(1);
    else if (property.startsWith('["'))
      property = property.replaceAll(/^\["|"\]$/g, '');
    else property = Number(property.replaceAll(/^\[|\]$/g, ''));
  }

  return [property, operator, value];
};

/**
 * Gets the object property from a pattern.
 *
 * @param pattern - A string pattern for an object property. Computed
 *   properties are allowed.
 * @returns the object property. The value is always a string.
 * @example
 * ```ts
 * getObjectProperty('{ name }'); // 'name'
 * getObjectProperty('{name}'); // 'name'
 * getObjectProperty('{"computed-property"}'); // 'computed-string-property'
 * getObjectProperty('{[0]}'); // '0'
 * ```
 */
export const getObjectProperty: PatternValueGetter<string> = pattern =>
  getMatches(pattern, regexes.objectPropertyPattern)[0].replaceAll(
    /["\[\]]/g,
    ''
  );

/**
 * Gets the specified property and the property name for the rest of the
 *   values an object.
 *
 * @param pattern - A string pattern containing a property and the property
 *   for the rest of the properties.
 * @returns an array containing 2 values. The first value is the specified
 *   property. The second value is the name of the property for the rest of
 *   the values.
 * @example
 * ```ts
 * getObjectProperties('{ name, ...rest }'); // ['name', 'rest']
 * getObjectProperties('{ ["computed-property"], ...rest }'); // ['computed-property', 'rest
 * getObjectProperties('{ [0], ...rest }'); // ['0', 'rest']
 * ```
 */
export const getObjectProperties: PatternValueGetter<
  [string, string]
> = pattern => {
  const [property, rest] = getMatches(pattern, regexes.objectPropertiesPattern);
  return [property.replaceAll(/["\[\]]/g, ''), rest];
};
