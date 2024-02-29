import { IsMatchOne } from '../types/match.types.ts';

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
