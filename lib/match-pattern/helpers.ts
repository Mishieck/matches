import * as matchHelpers from '../match/helpers.ts';
import type { IsMatch, IsMatchSame, Inequable } from '../match/helpers.ts';
import type { Compare } from '../match/match.types.ts';
import type { GenericRecord } from '../types/data.types.ts';

export type EmptyPattern = '';
export type AnyPattern = '_';
export type IdentifierPattern = `${'_' | string}${string | ''}`;
export type HeadPattern = `[${IdentifierPattern}]`;
export type HeadAndTailPattern =
  `[${IdentifierPattern}, ...${IdentifierPattern}]`;
export type LastPattern = `[...${AnyPattern}, ${IdentifierPattern}]`;
export type LastAndRestPattern =
  `[...${IdentifierPattern}, ${IdentifierPattern}]`;
export type LiteralPattern = `${string | number}`;
export type OperandPattern = LiteralPattern | IdentifierPattern;
export type ComparisonOperatorPattern =
  | '=='
  | '==='
  | '!='
  | '<'
  | '<='
  | '>'
  | '>=';
export type BinaryOperationPattern =
  `${OperandPattern} ${ComparisonOperatorPattern} ${OperandPattern}`;

export type Pattern =
  | EmptyPattern
  | AnyPattern
  | HeadPattern
  | HeadAndTailPattern
  | LastPattern
  | LastAndRestPattern
  | LiteralPattern
  | IdentifierPattern
  | BinaryOperationPattern;

export type GetValue<Input = unknown, Output = unknown> = (
  value: Input
) => Output;
export type Matcher = [Compare, GetValue];
export type HeadAndTail<Item> = [Item, Array<Item>];
export type PatternEntry = [Pattern, CallableFunction];

export type IterableConstructor<Value = unknown> = new (
  arr?: Array<Value>
) => ThisType<Iterable<Value>>;

export const anyPattern = /^_$/;
export const emptyPattern = /^\[\]$/;
export const headPattern = /^\[([_a-zA-Z$][\w$]*)\]$/;
export const headAndTailPattern =
  /^\[([_a-zA-Z$][\w$]+),\s+\.\.\.([_a-zA-Z$][\w$]*)\]$/;
export const lastPattern = /^\[\.\.\._,\s+([_a-zA-Z$][\w$]*)\]$/;
export const lastAndRestPattern =
  /^\[\.\.\.([_a-zA-Z$][\w$]*),\s+([_a-zA-Z$][\w$]*)\]$/;
export const literalPattern =
  /(^['"].*['"]$|^\-?\d+$|^\-?\d+n$|^true$|^false$|^null$|^undefined$)/;
export const binaryOperationPattern =
  /(^[_a-zA-Z$][\w$]*(?:\.[_a-zA-Z$][\w$]*|\[(?:".*"|\d+)\])?)\s([<>]|<=|>=|==|===|!=)\s(.*)/;
export const truthyPattern = /^\?$/;
export const falsyPattern = /^!$/;
export const existPattern = /^\?\?$/;
export const regexPattern = /^\/((?:\\\/|[^\/])+)\/([gimsuy]*)$/;
export const objectPropertyPattern = /^{\s?([_a-zA-Z$][\w$]*)\s?}$/;
export const objectPropertiesPattern =
  /^{\s?([_a-zA-Z$][\w$]*),\s\.\.\.([_a-zA-Z$][\w$]*)\s?}$/;

/**
 * Returns the argument passed to it.
 *
 * @param value - The value to be returned.
 * @returns the `value` passed in as an argument.
 * @example
 * ```ts
 * console.log(identity(1)); // 1
 * ```
 */
const identity = (value: unknown) => value;

/**
 * Gets the item in an `ArrayLike` collection with only one item.
 *
 * @param arrayLike - An `ArrayLike` collection.
 * @returns the item in `arrayLike`.
 * @example
 * ```ts
 * console.log(getOnlyItem([1])); // 1
 * ```
 */
export const getOnlyItem: GetValue = arrayLike =>
  (arrayLike as ArrayLike<unknown>)[0];

/**
 * Gets the head and tail of an `Iterable`.
 *
 * @param iterable - An `Iterable`. If the iterable is not an array or string,
 *   its constructor must be able to accept an array as an argument. This is
 *   necessary to construct the tail using the same type as the original
 *   iterable. Examples of such iterables include, `Set`, `Map`, and
 *   `Uint8Array`.
 * @returns an array where the first item is the first element of the
 *   `iterable` and the second element is the rest of the iterable.
 * @example
 * ```ts
 * console.log(getHeadAndTail([1, 2])); // [1, [2]]
 * console.log(getHeadAndTail([1])); // [1, []]
 * console.log(getHeadAndTail('match')); // ['m', 'atch']
 * ```
 */
export const getHeadAndTail: GetValue<Iterable<unknown>> = iterable => {
  switch (true) {
    case typeof iterable === 'string': {
      const str = iterable as string;
      return [str[0], str.substring(1)];
    }
    case Array.isArray(iterable): {
      const arr = iterable as Array<unknown>;
      return [arr[0], arr.slice(1)];
    }
    default: {
      const arr = [...iterable];

      return [
        arr[0],
        new (iterable.constructor as IterableConstructor)(arr.slice(1))
      ];
    }
  }
};

/**
 * Gets the last element in an `ArrayLike` collection.
 *
 * @param arrayLike - An `ArrayLike` collection.
 * @returns the last element in `arrayLike`.
 * @example
 * ```ts
 * console.log(getLast([1, 2])); // 2
 * console.log(getLast([1])); // 1
 * console.log(getLast('match')); // 'h'
 * ```
 */
export const getLast: GetValue = arrayLike => {
  const al = arrayLike as ArrayLike<unknown>;
  return al[al.length - 1];
};

/**
 * Gets the last and the rest of elements of an `Iterable`.
 *
 * @param iterable - An `Iterable`. If the iterable is not an array or string,
 *   its constructor must be able to accept an array as an argument. This is
 *   necessary to construct the iterable for the remaining elements as an
 *   iterable of same type as the original iterable. Examples of such iterables
 *   include, `Set`, `Map`, and `Uint8Array`.
 * @returns an array where the first item is the rest of the elements after
 *   removing the last element of `iterable`, and the second element is the
 *   last element of the iterable.
 * @example
 * ```ts
 * console.log(getLastAndRest([1, 2])); // [[1], 2]
 * console.log(getLastAndRest([1])); // [[], 1]
 * console.log(getLastAndRest('match')); // ['matc', 'h']
 * ```
 */
export const getLastAndRest: GetValue<Iterable<unknown>> = iterable => {
  switch (true) {
    case typeof iterable === 'string': {
      const str = iterable as string;

      return [str.substring(0, str.length - 1), str[str.length - 1]];
    }
    case Array.isArray(iterable): {
      const arr = iterable as Array<unknown>;

      return [(arr as Array<unknown>).slice(0, arr.length - 1), arr.at(-1)];
    }
    default: {
      const arr = [...iterable];
      return [
        new (iterable.constructor as IterableConstructor)(
          arr.slice(0, arr.length - 1)
        ),
        arr.at(-1)
      ];
    }
  }
};

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
 * console.log(getPatternValue('1')); // 1
 * console.log(getPatternValue('1n')); // 1n
 * console.log(getPatternValue('"match"')); // 'match'
 * ```
 */
export const getPatternValue = (value: string) => {
  const func = new Function(`return ${value};`);
  return func();
};

export const getProperty =
  (property: string | number): GetValue<GenericRecord> =>
  object =>
    object[property];

const binaryOps: Record<string, IsMatch | IsMatchSame<Inequable>> = {
  '<': matchHelpers.isLessThan,
  '>': matchHelpers.isGreaterThan,
  '<=': matchHelpers.isLessThanOrEqual,
  '>=': matchHelpers.isGreaterThanOrEqual,
  '===': matchHelpers.equals,
  '!=': (value: unknown) => matchHelpers.not(matchHelpers.equals(value))
};

export const getBinaryOpMatcher = (pattern: string): Matcher => {
  const [left, operator, right] = getMatches(pattern, binaryOperationPattern);
  const propertyAccessPattern = /(\.[_a-zA-Z$][\w$]*|\[.+\])/;
  // console.log({ operator });
  // console.log({ right });
  const value = getPatternValue(right);
  const compare = binaryOps[operator](value) as Compare;
  let getValue: GetValue = identity;

  if (propertyAccessPattern.test(left)) {
    let property: string | number = left.replace(/^[\w$]+/, '');

    if (property.startsWith('.')) property = property.substring(1);
    else if (property.startsWith('["'))
      property = property.replaceAll(/^\["|"\]$/g, '');
    else property = Number(property.replaceAll(/^\[|\]$/g, ''));

    getValue = getProperty(property) as GetValue;
  }
  // console.log({ value });
  return [compare, getValue];
};

export const createRegex = (literal: string) => {
  const [regex, flags] = getMatches(literal, regexPattern);
  return new RegExp(regex, flags);
};

export const getObjectProperty: GetValue<string, string> = pattern =>
  getMatches(pattern, objectPropertyPattern)[0];

export const getObjectProperties: GetValue<
  string,
  [string, string]
> = pattern => {
  const [property, rest] = getMatches(pattern, objectPropertiesPattern);
  return [property, rest];
};

export const getPropertyValues =
  ([property, rest]: [string, string]): GetValue<
    GenericRecord,
    GenericRecord
  > =>
  object => {
    const keys = Object.keys(object);
    keys.splice(keys.indexOf(property), 1);
    const restValues: GenericRecord = {};
    for (const key of keys) restValues[key] = object[key];
    return { [property]: object[property], [rest]: restValues };
  };

/**
 * Gets utility functions for matching and extracting values from a given value.
 *
 * @param pattern - The string that represents a pattern to be matched against.
 * @returns an array with two functions. The first function takes a value and
 *   performs some comparison according to the `pattern`. The second value
 *   takes a value and returns, extracts or converts it to another value
 *   according to the `pattern`.
 * @example
 * ```ts
 * const numberLiteral = '1';
 * const [equals1, identity] = getMatcher(numberLiteral);
 * console.log(equals1(1)); // true
 * console.log(equals1(0)); // false
 * console.log(identity(1)); // 1
 * console.log(identity(0)); // 0
 * ```
 * @example
 * ```ts
 * const headAndTailPattern = '[head, ...tail]';
 * const [hasMinLength1, getHeadAndTail] = getMatcher(headAndTailPattern);
 * console.log(hasMinLength1([1, 2])); // true
 * console.log(hasMinLength1([])); // false
 * console.log(getHeadAndTail([1, 2])); // [1, [2]]
 * console.log(getHeadAndTail([1])); // [1, []]
 * ```
 */
export const getMatcher = (pattern: Pattern): Matcher => {
  switch (true) {
    case matchHelpers.matches(literalPattern)(pattern):
      return [
        matchHelpers.equals(getPatternValue(pattern)) as Compare,
        identity
      ];
    case matchHelpers.matches(anyPattern)(pattern):
      return [matchHelpers.isAny(), identity];
    case matchHelpers.matches(emptyPattern)(pattern):
      return [matchHelpers.hasLength(0) as Compare, identity];
    case matchHelpers.matches(headPattern)(pattern):
      return [matchHelpers.hasLength(1) as Compare, getOnlyItem];
    case matchHelpers.matches(headAndTailPattern)(pattern):
      return [
        matchHelpers.hasMinLength(1) as Compare,
        getHeadAndTail as GetValue
      ];
    case matchHelpers.matches(lastPattern)(pattern):
      return [matchHelpers.hasMinLength(1) as Compare, getLast];
    case matchHelpers.matches(lastAndRestPattern)(pattern):
      return [
        matchHelpers.hasMinLength(1) as Compare,
        getLastAndRest as GetValue
      ];
    case matchHelpers.matches(binaryOperationPattern)(pattern):
      return getBinaryOpMatcher(pattern);
    case matchHelpers.matches(truthyPattern)(pattern):
      return [matchHelpers.isTruthy(), identity];
    case matchHelpers.matches(falsyPattern)(pattern):
      return [matchHelpers.isFalsy(), identity];
    case matchHelpers.matches(existPattern)(pattern):
      return [matchHelpers.exists(), identity];
    case matchHelpers.matches(regexPattern)(pattern):
      return [matchHelpers.matches(createRegex(pattern)) as Compare, identity];
    case matchHelpers.matches(objectPropertyPattern)(pattern):
      return [
        matchHelpers.hasProperty(getObjectProperty(pattern)) as Compare,
        getProperty(getObjectProperty(pattern)) as GetValue
      ];
    case matchHelpers.matches(objectPropertiesPattern)(pattern): {
      const properties = getObjectProperties(pattern);

      return [
        matchHelpers.hasProperty(properties[0]) as Compare,
        getPropertyValues(properties) as GetValue
      ];
    }
    default:
      return [
        matchHelpers.isAny(),
        () => new Error(`Invalid pattern ${pattern}`)
      ];
  }
};
