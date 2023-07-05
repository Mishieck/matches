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

export const isAny: IsMatchOne = () => _ => true;

export const isType: IsMatch<DataType> = (dataType: DataType) => value =>
  // deno-lint-ignore valid-typeof
  typeof value === dataType;

export const isNumber: IsMatchOne = () => isType('number');
export const isBoolean: IsMatchOne = () => isType('boolean');
export const isBigInt: IsMatchOne = () => isType('bigint');
export const isString: IsMatchOne = () => isType('string');
export const isFunction: IsMatchOne = () => isType('function');
export const isSymbol: IsMatchOne = () => isType('symbol');
export const isObject: IsMatchOne = () => isType('object');
export const isArray: IsMatchOne = () => value => Array.isArray(value);
export const isArrayLike: IsMatchOne = () => value =>
  typeof value === 'string' ||
  (typeof value === 'object' && value !== null && 'length' in value);

export const isRecord: IsMatchOne = () => value =>
  typeof value === 'object' && value !== null && value.constructor === Object;

export const isFalse: IsMatchOne = () => value => value === false;
export const isTrue: IsMatchOne = () => value => value === true;
export const equals: IsMatch = first => second => first === second;

export const isLessThan: IsMatchSame<Inequable> = first => second =>
  second < first;

export const isLessThanOrEqual: IsMatchSame<Inequable> = first => second =>
  second <= first;

export const isGreaterThan: IsMatchSame<Inequable> = first => second =>
  second > first;

export const isGreaterThanOrEqual: IsMatchSame<Inequable> = first => second =>
  second >= first;

export const matches: IsMatch<RegExp, string> = regex => str => regex.test(str);

export const isUndefined: IsMatchOne = () => value => value === undefined;
export const isNull: IsMatchOne = () => value => value === null;
export const exists: IsMatchOne = () => value =>
  value !== undefined && value !== null;

export const isFalsy: IsMatchOne = () => value => !value;
export const isTruthy: IsMatchOne = () => value => !!value;

export const isEmpty: IsMatchOne<Iterable<unknown>> = () => iterable => {
  for (const _ of iterable) return false;
  return true;
};

// deno-lint-ignore ban-types
export const isInstanceOf: IsMatch<Function> = Constructor => value =>
  value instanceof Constructor;

export const hasLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length === length;

export const hasMinLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length >= length;

export const hasMaxLength: IsMatch<number, ArrayLike<unknown>> =
  length => arrayLike =>
    arrayLike.length <= length;

export const hasSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size === size;

export const hasMinSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size >= size;

export const hasMaxSize: IsMatch<number, MapOrSet> = size => mapOrSet =>
  mapOrSet.size <= size;

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

export const not: IsMatch<ReturnType<IsMatch>> = isMatch => value =>
  !isMatch(value);

export const eachOne: IsMatch<ReturnType<IsMatch>, Iterable<unknown>> =
  isMatch => iterable => {
    for (const item of iterable) if (!isMatch(item)) return false;
    return true;
  };

export const none: IsMatch<ReturnType<IsMatch>, Iterable<unknown>> =
  isMatch => iterable => {
    for (const item of iterable) if (isMatch(item)) return false;
    return true;
  };
