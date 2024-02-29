export type Compare<Second = unknown> = (second: Second) => boolean;

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
