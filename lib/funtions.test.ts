import { toEqual, type ModuleRunner, mod } from '../deps.ts';
import * as helpers from './functions.ts';

export const runMatchHelpers: ModuleRunner = describe => {
  describe('Helpers', it => {
    it('should handle any', expect => {
      expect(helpers.isAny()(true), toEqual(true));
      expect(helpers.isAny()(''), toEqual(true));
      expect(helpers.isAny()(1), toEqual(true));
      expect(helpers.isAny()(1n), toEqual(true));
      expect(helpers.isAny()({}), toEqual(true));
      expect(helpers.isAny()([]), toEqual(true));
      expect(helpers.isAny()(Symbol(1)), toEqual(true));
      expect(helpers.isAny()(null), toEqual(true));
      expect(helpers.isAny()(undefined), toEqual(true));
    });

    it('should handle equality', expect => {
      expect(helpers.equals(true)(true), toEqual(true));
      expect(helpers.equals(true)(false), toEqual(false));
    });

    it('should handle inequality', expect => {
      expect(helpers.isLessThan(1)(0), toEqual(true));
      expect(helpers.isLessThan(1)(1), toEqual(false));
      expect(helpers.isLessThanOrEqual(1)(0), toEqual(true));
      expect(helpers.isLessThanOrEqual(1)(1), toEqual(true));
      expect(helpers.isLessThanOrEqual(1)(2), toEqual(false));
      expect(helpers.isGreaterThan(1)(2), toEqual(true));
      expect(helpers.isGreaterThan(1)(1), toEqual(false));
      expect(helpers.isGreaterThanOrEqual(1)(2), toEqual(true));
      expect(helpers.isGreaterThanOrEqual(1)(1), toEqual(true));
      expect(helpers.isGreaterThanOrEqual(1)(0), toEqual(false));
    });

    it('should handle nullish values', expect => {
      expect(helpers.isNonNullish()(true), toEqual(true));
      expect(helpers.isNonNullish()(false), toEqual(true));
      expect(helpers.isNonNullish()(null), toEqual(false));
      expect(helpers.isNonNullish()(undefined), toEqual(false));
    });

    it('should handle negation', expect => {
      expect(helpers.not(helpers.equals(true))(false), toEqual(true));
      expect(helpers.not(helpers.equals(1))(2), toEqual(true));
      expect(helpers.not(helpers.equals(1))(1), toEqual(false));
    });

    it('should handle regexes', expect => {
      expect(helpers.matches(/\w/)('Match'), toEqual(true));
      expect(helpers.matches(/\d/)('Match'), toEqual(false));
    });

    it('should handle data types', expect => {
      expect(helpers.isType('bigint')(1n), toEqual(true));
      expect(helpers.isType('boolean')(true), toEqual(true));
      expect(
        helpers.isType('function')(() => {}),
        toEqual(true)
      );
      expect(helpers.isType('object')({}), toEqual(true));
      expect(helpers.isType('number')(1), toEqual(true));
      expect(helpers.isType('string')(''), toEqual(true));
      expect(helpers.isType('symbol')(Symbol(1)), toEqual(true));
      expect(helpers.isType('undefined')(undefined), toEqual(true));
    });

    it('should handle big ints', expect => {
      expect(helpers.isBigInt()(1n), toEqual(true));
      expect(helpers.isBigInt()(1), toEqual(false));
    });

    it('should handle booleans', expect => {
      expect(helpers.isBoolean()(true), toEqual(true));
      expect(helpers.isBoolean()(false), toEqual(true));
      expect(helpers.isBoolean()('true'), toEqual(false));
    });

    it('should handle functions', expect => {
      expect(
        helpers.isFunction()(() => {}),
        toEqual(true)
      );
      expect(
        helpers.isFunction()(function () {}),
        toEqual(true)
      );
      expect(helpers.isFunction()(Number), toEqual(true));
      expect(helpers.isFunction()({}), toEqual(false));
    });

    it('should handle objects', expect => {
      expect(helpers.isObject()({}), toEqual(true));
      expect(helpers.isObject()(null), toEqual(true));
      expect(helpers.isObject()([]), toEqual(true));
      expect(helpers.isObject()(true), toEqual(false));
    });

    it('should handle numbers', expect => {
      expect(helpers.isNumber()(1), toEqual(true));
      expect(helpers.isNumber()(NaN), toEqual(true));
      expect(helpers.isNumber()(1n), toEqual(false));
    });

    it('should handle strings', expect => {
      expect(helpers.isString()(''), toEqual(true));
      expect(helpers.isString()(true), toEqual(false));
      expect(helpers.isString()(new String('')), toEqual(false));
    });

    it('should handle symbols', expect => {
      expect(helpers.isSymbol()(Symbol(1)), toEqual(true));
      expect(helpers.isSymbol()(1), toEqual(false));
    });

    it('should handle undefined', expect => {
      expect(helpers.isUndefined()(undefined), toEqual(true));
      expect(helpers.isUndefined()(null), toEqual(false));
      expect(helpers.isUndefined()(false), toEqual(false));
    });

    it('should handle null', expect => {
      expect(helpers.isNull()(null), toEqual(true));
      expect(helpers.isNull()(undefined), toEqual(false));
      expect(helpers.isNull()(false), toEqual(false));
    });

    it('should handle records', expect => {
      expect(helpers.isRecord()({}), toEqual(true));
      expect(helpers.isRecord()(null), toEqual(false));
      expect(helpers.isRecord()([]), toEqual(false));
      expect(helpers.isRecord()(new String('')), toEqual(false));
    });

    it('should handle arrays', expect => {
      expect(helpers.isArray()([]), toEqual(true));
      expect(helpers.isArray()(''), toEqual(false));
    });

    it('should handle array-like collections', expect => {
      expect(helpers.isArrayLike()([]), toEqual(true));
      expect(helpers.isArrayLike()(''), toEqual(true));
      expect(helpers.isArrayLike()({}), toEqual(false));
    });

    it('should handle instances of constructors', expect => {
      expect(helpers.isInstanceOf(Object)({}), toEqual(true));
      expect(helpers.isInstanceOf(Object)([]), toEqual(true));
      expect(helpers.isInstanceOf(Array)([]), toEqual(true));
      expect(helpers.isInstanceOf(String)(new String('')), toEqual(true));
      expect(helpers.isInstanceOf(Object)(true), toEqual(false));
    });

    it('should handle booleans', expect => {
      expect(helpers.isTrue()(true), toEqual(true));
      expect(helpers.isFalse()(false), toEqual(true));
      expect(helpers.isTrue()(false), toEqual(false));
      expect(helpers.isFalse()(0), toEqual(false));
    });

    it('should handle truthy values', expect => {
      expect(helpers.isTruthy()(true), toEqual(true));
      expect(helpers.isTruthy()(1), toEqual(true));
      expect(helpers.isTruthy()({}), toEqual(true));
      expect(helpers.isTruthy()([]), toEqual(true));
      expect(helpers.isTruthy()(false), toEqual(false));
      expect(helpers.isTruthy()(''), toEqual(false));
      expect(helpers.isTruthy()(null), toEqual(false));
      expect(helpers.isTruthy()(undefined), toEqual(false));
    });

    it('should handle falsy values', expect => {
      expect(helpers.isFalsy()(false), toEqual(true));
      expect(helpers.isFalsy()(''), toEqual(true));
      expect(helpers.isFalsy()(null), toEqual(true));
      expect(helpers.isFalsy()(undefined), toEqual(true));
      expect(helpers.isFalsy()(true), toEqual(false));
      expect(helpers.isFalsy()(1), toEqual(false));
      expect(helpers.isFalsy()({}), toEqual(false));
      expect(helpers.isFalsy()([]), toEqual(false));
    });

    it('should handle emptiness', expect => {
      expect(helpers.isEmpty()([]), toEqual(true));
      expect(helpers.isEmpty()(''), toEqual(true));
      expect(helpers.isEmpty()(new Set()), toEqual(true));
      expect(helpers.isEmpty()(new Map()), toEqual(true));
      expect(helpers.isEmpty()([1]), toEqual(false));
    });

    it('should handle matching every collection item', expect => {
      expect(helpers.eachOne(helpers.equals(1))([1]), toEqual(true));
      expect(helpers.eachOne(helpers.equals(1))([1, 1]), toEqual(true));
      expect(helpers.eachOne(helpers.equals('c'))('cc'), toEqual(true));
      expect(
        helpers.eachOne(helpers.equals(1))(new Set([1, 1])),
        toEqual(true)
      );
      expect(
        helpers.eachOne(helpers.equals(1))(new Map([['a', 1]])),
        toEqual(false)
      );
      expect(helpers.eachOne(helpers.equals(1))([1, 2]), toEqual(false));
    });

    it('should handle collection items', expect => {
      expect(helpers.contains(1)([1]), toEqual(true));
      expect(helpers.contains('c')('code'), toEqual(true));
      expect(helpers.contains(1)(new Set([1])), toEqual(true));
      expect(helpers.contains(0)(new Map([[1, 0]])), toEqual(true));
      expect(helpers.contains(2)([1]), toEqual(false));
    });

    it('should handle lengths of array-like collections', expect => {
      expect(helpers.hasLength(0)([]), toEqual(true));
      expect(helpers.hasLength(1)([1]), toEqual(true));
      expect(helpers.hasLength(0)(''), toEqual(true));
      expect(helpers.hasLength(4)('code'), toEqual(true));
      expect(helpers.hasMinLength(1)([1]), toEqual(true));
      expect(helpers.hasMinLength(3)('code'), toEqual(true));
      expect(helpers.hasMaxLength(1)([1]), toEqual(true));
      expect(helpers.hasMaxLength(4)('code'), toEqual(true));
    });

    it('should handle size of sets and maps', expect => {
      expect(helpers.hasSize(0)(new Set()), toEqual(true));
      expect(helpers.hasSize(1)(new Set([1])), toEqual(true));
      expect(helpers.hasSize(0)(new Map()), toEqual(true));
      expect(helpers.hasSize(1)(new Map([[1, 1]])), toEqual(true));
      expect(helpers.hasMinSize(1)(new Set([1])), toEqual(true));
      expect(helpers.hasMinSize(1)(new Map([[1, 1]])), toEqual(true));
      expect(helpers.hasMaxSize(1)(new Set([1])), toEqual(true));
      expect(helpers.hasMaxSize(1)(new Map([[1, 1]])), toEqual(true));
    });

    it('should handle object properties', expect => {
      expect(
        helpers.hasProperty('property')({ property: 'property' }),
        toEqual(true)
      );
    });

    it('should handle iterables having at least 1 element', expect => {
      expect(helpers.hasAtLeastOneElement()([1]), toEqual(true));
      expect(helpers.hasAtLeastOneElement()([1, 2]), toEqual(true));
      expect(helpers.hasAtLeastOneElement()('m'), toEqual(true));
      expect(helpers.hasAtLeastOneElement()('match'), toEqual(true));
      expect(helpers.hasAtLeastOneElement()(new Set([1])), toEqual(true));
      expect(
        helpers.hasAtLeastOneElement()(new Map([[1, true]])),
        toEqual(true)
      );
    });
  });
};

export const run = () => mod('MatchHelpers', runMatchHelpers);
