import type { Compare } from './match.types.ts';

export type DataType =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'object'
  | 'number'
  | 'string'
  | 'symbol'
  | 'undefined';

export type Inequable = number | bigint | string;

export type MapOrSet = Map<unknown, unknown> | Set<unknown>;

export type Collection<Item = unknown> = ArrayLike<Item> | MapOrSet;

export type IsMatch<First = unknown, Second = unknown> = (
  first: First
) => Compare<Second>;

export type IsMatchOne<Value = unknown> = () => Compare<Value>;

export type IsMatchSame<Type = unknown> = (first: Type) => Compare<Type>;

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

/**
 * Checks whether the type of a particular value matches a specified type.
 *
 * @param dataType - The data type the value is going to be tested for.
 *   The data type is any value that can be used with the `typeof` operator.
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not the value has the specified type.
 * @example
 * ```ts
 * isType('number')(1) // true
 * isType('string')('match') // true
 * isType('number')('match') // false
 * ```
 */
export const isType: IsMatch<DataType> = (dataType: DataType) => value =>
  // deno-lint-ignore valid-typeof
  typeof value === dataType;

/**
 * Checks whether a value is a number or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `number`.
 * @example
 * ```ts
 * isNumber()(1) // true
 * isNumber()('match') // false
 * ```
 */
export const isNumber: IsMatchOne = () => isType('number');

/**
 * Checks whether a value is a boolean or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `boolean`.
 * @example
 * ```ts
 * isBoolean()(true) // true
 * isBoolean()(1) // false
 * ```
 */
export const isBoolean: IsMatchOne = () => isType('boolean');

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

/**
 * Checks whether a value is a string or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `string`.
 * @example
 * ```ts
 * isString()('match') // true
 * isString()(1) // false
 * ```
 */
export const isString: IsMatchOne = () => isType('string');

/**
 * Checks whether a value is a function or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `function`.
 * @example
 * ```ts
 * isFunction()(() => {}) // true
 * isFunction()(Array) // true
 * isFunction()({}) // false
 * ```
 */
export const isFunction: IsMatchOne = () => isType('function');

/**
 * Checks whether a value is a symbol or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `symbol`.
 * @example
 * ```ts
 * isSymbol()(Symbol(1)) // true
 * isSymbol()(1) // false
 * ```
 */
export const isSymbol: IsMatchOne = () => isType('symbol');

/**
 * Checks whether a value is a object or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is of type `object`.
 * @example
 * ```ts
 * isObject()({}) // true
 * isObject()([]) // true
 * isObject()(null) // true
 * isObject()(1) // false
 * ```
 */
export const isObject: IsMatchOne = () => isType('object');

/**
 * Checks whether a value is an array or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is an array.
 * @example
 * ```ts
 * isArray()([]) // true
 * isArray()({}) // false
 * ```
 */
export const isArray: IsMatchOne = () => value => Array.isArray(value);

/**
 * Checks whether a value is an array-like collection or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is an `ArrayLike` collection.
 * @example
 * ```ts
 * isArrayLike()([]) // true
 * isArrayLike()('') // true
 * isArrayLike()({ length: 0 }) // true
 * isArrayLike()({}) // false
 * ```
 */
export const isArrayLike: IsMatchOne = () => value =>
  typeof value === 'string' ||
  (typeof value === 'object' && value !== null && 'length' in value);

/**
 * Checks whether a value is a record (object or key-value pairs) or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is a `Record`.
 * @example
 * ```ts
 * isRecord()({}) // true
 * isRecord()([]) // false
 * isRecord()(new Boolean(true)) // false
 * ```
 */
export const isRecord: IsMatchOne = () => value =>
  typeof value === 'object' && value !== null && value.constructor === Object;

/**
 * Checks whether a value is `false` or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is `false`.
 * @example
 * ```ts
 * isFalse()(false) // true
 * isFalse()(true) // false
 * isFalse()(0) // false
 * ```
 */
export const isFalse: IsMatchOne = () => value => value === false;

/**
 * Checks whether a value is true or not.
 *
 * @returns a function that takes any type of parameter and returns a boolean
 *   that indicates whether or not a value is `true`.
 * @example
 * ```ts
 * isTrue()(true) // true
 * isTrue()(false) // false
 * isTrue()(1) // false
 * ```
 */
export const isTrue: IsMatchOne = () => value => value === true;

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

/**
 * Checks if one value is less than another.
 *
 * @param first - The first value to be used in the inequality.
 * @returns a function that takes another value and checks if the second value
 *   is less than the first.
 * @example
 * ```ts
 * isLessThan(1)(0) // true
 * isLessThan(1)(1) // false
 * ```
 */
export const isLessThan: IsMatchSame<Inequable> = first => second =>
  second < first;

/**
 * Checks if one value is less that or equal to another value.
 *
 * @param first - The first value to be used in the inequality.
 * @returns a function that takes the second value and checks if the second
 *   value is less that or equal to the first one.
 * @example
 * ```ts
 * isLessThanOrEqual(1)(0) // true
 * isLessThanOrEqual(1)(1) // true
 * isLessThanOrEqual(1)(2) // false
 * ```
 */
export const isLessThanOrEqual: IsMatchSame<Inequable> = first => second =>
  second <= first;

/**
 * Checks if one value is greater than another value.
 *
 * @param first - The first value to be used in the inequality.
 * @returns a function that takes the second value and checks if the second
 *   value is greater than the first one.
 * @example
 * ```ts
 * isGreaterThan(1)(2) // true
 * isGreaterThan(1)(1) // false
 * ```
 */
export const isGreaterThan: IsMatchSame<Inequable> = first => second =>
  second > first;

/**
 * Checks if one value is greater than or equal to another value.
 *
 * @param first - The first value to be used in the inequality.
 * @returns a function that takes the second value and checks if the second
 *   value is greater that or equal to the first one.
 * @example
 * ```ts
 * isGreaterThanOrEqual(1)(2) // true
 * isGreaterThanOrEqual(1)(1) // true
 * isGreaterThanOrEqual(1)(0) // false
 * ```
 */
export const isGreaterThanOrEqual: IsMatchSame<Inequable> = first => second =>
  second >= first;

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

/**
 * Checks if a value is `null` or `undefined`.
 *
 * @returns a function that takes any type of value and checks if the value is
 *   `null` or `undefined`. The function returns `true` if the value is neither
 *   `false` otherwise.
 * @example
 * ```ts
 * exists()(1) // true
 * exists()(null) // false
 * exists()(undefined) // false
 * ```
 */
export const exists: IsMatchOne = () => value =>
  value !== undefined && value !== null;

/**
 * Checks if a value is falsy.
 *
 * @returns a function that takes any type of value and checks if the value is
 *   falsy.
 * @example
 * ```ts
 * isFalsy()(false) // true
 * isFalsy()(0) // true
 * isFalsy()('') // true
 * isFalsy()(null) // true
 * isFalsy()(undefined) // true
 * isFalsy()(NaN) // true
 * isFalse()(1) // false
 * ```
 */
export const isFalsy: IsMatchOne = () => value => !value;

/**
 * Checks if a value is truthy.
 *
 * @returns a function that takes any type of value and checks if the value is
 *   truthy.
 * @example
 * ```ts
 * isTruthy()(true) // true
 * isTruthy()(1) // true
 * isTruthy()(false) // false
 * isTruthy()(0) // false
 * isTruthy()('') // false
 * isTruthy()(null) // false
 * isTruthy()(undefined) // false
 * isTruthy()(NaN) // false
 * ```
 */
export const isTruthy: IsMatchOne = () => value => !!value;

/**
 * Checks if an `Iterable` is empty.
 *
 * @returns a function that takes an `Iterable` and checks if it is empty.
 * @example
 * ```ts
 * isEmpty()([]) // true
 * isEmpty()('') // true
 * isEmpty())([1]) // false
 * ```
 */
export const isEmpty: IsMatchOne<Iterable<unknown>> = () => iterable => {
  for (const _ of iterable) return false;
  return true;
};

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
// deno-lint-ignore ban-types
export const isInstanceOf: IsMatch<Function> = Constructor => value =>
  value instanceof Constructor;

/**
 * Checks if an `ArrayLike` collection has a given length.
 *
 * @param length - The length to check against.
 * @returns a function that takes an `ArrayLike` collection and checks if
 *   the it has the specified length.
 * @example
 * ```ts
 * hasLength(1)([1]) // true
 * hasLength(1)([]) // false
 * ```
 */
export const hasLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length === length;

/**
 * Checks if an `ArrayLike` collection has a given minimum length.
 *
 * @param length - The length to check against.
 * @returns a function that takes an `ArrayLike` collection and checks if
 *   it has at least the given length.
 * @example
 * ```ts
 * hasMinLength(1)([1]) // true
 * hasMinLength(1)([1, 2]) // true
 * hasMinLength(1)([]) // false
 * ```
 */
export const hasMinLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length >= length;

/**
 * Checks if an `ArrayLike` collection has a given maximum length.
 *
 * @param length - The length to check against.
 * @returns a function that takes an `ArrayLike` collection and checks if
 *   it has a length that is at most the given length.
 * @example
 * ```ts
 * hasMaxLength(1)([1]) // true
 * hasMaxLength(1)([]) // true
 * hasMaxLength(1)([1, 2]) // false
 * ```
 */
export const hasMaxLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length <= length;

/**
 * Checks if a `Map` or `Set` has the given size.
 *
 * @param size - The size to test against.
 * @returns a function that takes a `Map` or `Set` and checks if it has the
 *   given size.
 * @example
 * ```ts
 * hasSize(1)(new Set([1])) // true
 * hasSize(1)(new Map([[1, 1]])) // true
 * hasSize(1)(new Set()) // false
 * ```
 */
export const hasSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size === size;

/**
 * Checks if a `Map` or `Set` has a given minimum size.
 *
 * @param size - The size to check against.
 * @returns a function that takes a `Map` or `Set` and checks if it has the
 *   given size.
 * @example
 * ```ts
 * hasMinSize(1)(new Set([1])) // true
 * hasMinSize(1)(new Map([[1, 1]])) // true
 * hasMinSize(1)(new Set()) // false
 * ```
 */
export const hasMinSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size >= size;

/**
 * Checks if a `Map` or `Set` has a given maximum size.
 * @param size - The size to test against.
 * @returns a function that takes a `Map` or `Set` and checks if it has a size
 *   that is at most the given size.
 * @example
 * ```ts
 * hasMaxSize(1)(new Set([1])) // true
 * hasMaxSize(1)(new Map([[1, 1]])) // true
 * hasMaxSize(1)(new Set()) // true
 * hasMaxSize(1)(new Set([1, 2])) // false
 * ```
 */
export const hasMaxSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size <= size;

/**
 * Checks if an `Iterable` has a given item.
 * @param value - The value to check for in the `Iterable`.
 * @returns a function that takes an `Iterable` and checks if the given value
 *   is the `Iterable`.
 * @example
 * ```ts
 * contains(1)([1, 2]) // true
 * contains(1)([2]) // false
 * contains({})([{}]) // false
 * ```
 */
export const contains: IsMatch<unknown, Iterable<unknown>> =
  value => collection => {
    const iterable: Iterable<unknown> = [Set, Map].some(
      Constructor => collection instanceof Constructor
    )
      ? (collection as MapOrSet).values()
      : collection;

    for (const item of iterable) if (item === value) return true;
    return false;
  };

/**
 * Checks if a given value fails a given check. It negates the result of a
 *   check.
 *
 * @param isMatch - A function that takes a value and checks if it passes a
 *   particular condition.
 * @returns a function that takes a value and checks if it fails a the check
 *   done by `isMatch`.
 * @example
 * ```ts
 * not(isNumber())('match') // true
 * not(isNumber())(1) // false
 * ```
 */
export const not: IsMatch<ReturnType<IsMatch>> = isMatch => value =>
  !isMatch(value);

/**
 * Checks if every item in an `Iterable` passes a given check.
 *
 * @param isMatch - A function that takes an value and checks if meets
 *   a particular condition.
 * @returns a function that takes an `Iterable` and checks if every item
 *   passes the check done by `isMatch`.
 * @example
 * ```ts
 * eachOne(isNumber())([1, 2]) // true
 * eachOne(isString())([1, 'match']) // false
 * ```
 */
export const eachOne: IsMatch<ReturnType<IsMatch>, Iterable<unknown>> =
  isMatch => iterable => {
    for (const item of iterable) if (!isMatch(item)) return false;
    return true;
  };

/**
 * Checks if a none of the items in an `Iterable` passes a given check.
 *
 * @param isMatch - A function that takes a value and checks if it meets a
 *   particular condition.
 * @returns a function that takes an `Iterable` and checks if none of the
 *   items passes the check done by `isMatch`.
 * @example
 * ```ts
 * none(isString())([1, 2]) // true
 * none(isNumber())([1, 'match']) // false
 * ```
 */
export const none: IsMatch<ReturnType<IsMatch>, Iterable<unknown>> =
  isMatch => iterable => {
    for (const item of iterable) if (isMatch(item)) return false;
    return true;
  };
