import * as matchHelpers from '../../match/helpers.ts';
import type { Compare } from '../../match/match.types.ts';
import type { Pattern } from '../../types/data.types.ts';
import type { GenericRecord } from '../../types/data.types.ts';
import * as regexes from './regexes.ts';
import * as patternValueGetters from './pattern-value-getters.ts';

export type GetValue<Input = unknown, Output = unknown> = (
  value: Input
) => Output;

export type Matcher = [Compare, GetValue];
export type HeadAndTail<Item> = [Item, Array<Item>];
export type PatternEntry = [Pattern, CallableFunction];

export type IterableConstructor<Value = unknown> = new (
  arr?: Array<Value>
) => ThisType<Iterable<Value>>;

export const binaryOps: Record<
  string,
  matchHelpers.IsMatch | matchHelpers.IsMatchSame<matchHelpers.Inequable>
> = {
  '<': matchHelpers.isLessThan,
  '>': matchHelpers.isGreaterThan,
  '<=': matchHelpers.isLessThanOrEqual,
  '>=': matchHelpers.isGreaterThanOrEqual,
  '===': matchHelpers.equals,
  '!=': (value: unknown) => matchHelpers.not(matchHelpers.equals(value))
};

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
export const identity = (value: unknown) => value;

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
 * Gets a the value of a given key from a `Record`.
 *
 * @param property - The property whose value to get.
 * @returns a function that a `Record` and returns the value of the given
 *   `property`.
 * @example
 * ```ts
 * getProperty('name')({ name: 'match' }); // 'match'
 * ```
 */
export const getProperty =
  (property: string | number): GetValue<GenericRecord> =>
  object =>
    object[property];

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
