/**
 * Compares one value to another using a closure.
 *
 * @param second - The second value to compare to
 */
export type Compare<Second = unknown> = (second: Second) => boolean;

/** The types that are returned by `typeof` operator */
export type DataType =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'object'
  | 'number'
  | 'string'
  | 'symbol'
  | 'undefined';

/** Data type that can be used in inequality checks like `first < second` */
export type Inequable = number | bigint | string;

/** A collection that is either a `Map` or a `Set` */
export type MapOrSet = Map<unknown, unknown> | Set<unknown>;

/** A generic collection that represents `ArrayLike`, `Map`, or `Set` */
export type Collection<Item = unknown> = ArrayLike<Item> | MapOrSet;

/**
 * Checks if the second value matches the constraints specified in first value
 *
 * @param first - The value that specifies the constraints
 * */
export type IsMatch<First = unknown, Second = unknown> = (
  first: First
) => Compare<Second>;

/**
 * Checks if a value matches certain implicit constraints,
 *   that is, you don't explicitly specify the constraints
 */
export type IsMatchOne<Value = unknown> = () => Compare<Value>;

/** Checks values that are of the same type */
export type IsMatchSame<Type = unknown> = (first: Type) => Compare<Type>;
