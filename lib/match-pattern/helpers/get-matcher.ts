import * as matchHelpers from '../../match/helpers.ts';
import type { Compare } from '../../match/match.types.ts';
import * as regexes from '../helpers/regexes.ts';
import * as patternValueGetters from '../helpers/pattern-value-getters.ts';
import { Pattern } from '../../types/data.types.ts';
import * as dataValueGetters from '../helpers/data-value-getters.ts';
import type { GetValue, Matcher } from '../helpers/data-value-getters.ts';

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
 * const [equals1, dataValueGetters.identity] = getMatcher(numberLiteral);
 * console.log(equals1(1)); // true
 * console.log(equals1(0)); // false
 * console.log(dataValueGetters.identity(1)); // 1
 * console.log(dataValueGetters.identity(0)); // 0
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
    case matchHelpers.matches(regexes.literalPattern)(pattern):
      return [
        matchHelpers.equals(patternValueGetters.getLiteral(pattern)) as Compare,
        dataValueGetters.identity
      ];
    case matchHelpers.matches(regexes.anyPattern)(pattern):
      return [matchHelpers.isAny(), dataValueGetters.identity];
    case matchHelpers.matches(regexes.emptyPattern)(pattern):
      return [matchHelpers.hasLength(0) as Compare, dataValueGetters.identity];
    case matchHelpers.matches(regexes.headPattern)(pattern):
      return [
        matchHelpers.hasAtLeastOneElement() as Compare,
        dataValueGetters.getOnlyItem
      ];
    case matchHelpers.matches(regexes.headAndTailPattern)(pattern):
      return [
        matchHelpers.hasAtLeastOneElement() as Compare,
        dataValueGetters.getHeadAndTail as GetValue
      ];
    case matchHelpers.matches(regexes.lastPattern)(pattern):
      return [
        matchHelpers.hasMinLength(1) as Compare,
        dataValueGetters.getLast
      ];
    case matchHelpers.matches(regexes.lastAndRestPattern)(pattern):
      return [
        matchHelpers.hasMinLength(1) as Compare,
        dataValueGetters.getLastAndRest as GetValue
      ];
    case matchHelpers.matches(regexes.binaryOperationPattern)(pattern): {
      const [property, operator, value] =
        patternValueGetters.getBinaryTerms(pattern);

      const isMatch = dataValueGetters.binaryOps[operator](value);

      const getValue = property
        ? dataValueGetters.getProperty(property)
        : dataValueGetters.identity;

      return [isMatch as Compare, getValue as GetValue];
    }
    case matchHelpers.matches(regexes.truthyPattern)(pattern):
      return [matchHelpers.isTruthy(), dataValueGetters.identity];
    case matchHelpers.matches(regexes.falsyPattern)(pattern):
      return [matchHelpers.isFalsy(), dataValueGetters.identity];
    case matchHelpers.matches(regexes.existPattern)(pattern):
      return [matchHelpers.exists(), dataValueGetters.identity];
    case matchHelpers.matches(regexes.regexPattern)(pattern):
      return [
        matchHelpers.matches(patternValueGetters.getRegex(pattern)) as Compare,
        dataValueGetters.identity
      ];
    case matchHelpers.matches(regexes.objectPropertyPattern)(pattern):
      return [
        matchHelpers.hasProperty(
          patternValueGetters.getObjectProperty(pattern)
        ) as Compare,
        dataValueGetters.getProperty(
          patternValueGetters.getObjectProperty(pattern)
        ) as GetValue
      ];
    case matchHelpers.matches(regexes.objectPropertiesPattern)(pattern): {
      const properties = patternValueGetters.getObjectProperties(pattern);

      return [
        matchHelpers.hasProperty(properties[0]) as Compare,
        dataValueGetters.getPropertyValues(properties) as GetValue
      ];
    }
    default:
      return [
        matchHelpers.isAny(),
        () => new Error(`Invalid pattern ${pattern}`)
      ];
  }
};
