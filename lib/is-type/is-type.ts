import { DataType, IsMatch } from '../types/match.types.ts';

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
