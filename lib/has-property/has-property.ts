import { GenericRecord } from '../types/data.types.ts';
import { IsMatch } from '../types/match.types.ts';

/**
 * Checks if a `Record` has a particular property.
 *
 * @param property - The property to check.
 * @returns - a function that takes a `Record` as an argument and returns a
 *   boolean that indicates whether the `property` isNonNullish on the record or
 *   not.
 * @example
 * ```ts
 * hasProperty('name')({ name: 'match' }); // true
 * ```
 */
export const hasProperty: IsMatch<string, GenericRecord> =
  property => object => {
    return property in object;
  };
