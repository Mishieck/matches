import {
  mod,
  toEqual,
  type ModuleRunner,
  toMatch,
  not,
  expect
} from '../../deps.ts';
import * as helpers from './helpers.ts';

export const runMatchPatternHelpers: ModuleRunner = describe => {
  describe('Regexes', it => {
    it('should match any pattern', expect => {
      expect('_', toMatch(helpers.anyPattern));
      expect('_a', not(toMatch(helpers.anyPattern)));
      expect('a_', not(toMatch(helpers.anyPattern)));
      expect('a_1', not(toMatch(helpers.anyPattern)));
    });

    it('should match empty pattern', expect => {
      expect('[]', toMatch(helpers.emptyPattern));
      expect('[_]', not(toMatch(helpers.emptyPattern)));
    });

    it('should match head pattern', expect => {
      expect('[_]', toMatch(helpers.headPattern));
      expect('[head]', toMatch(helpers.headPattern));
      expect('[_head]', toMatch(helpers.headPattern));
      expect('[head1]', toMatch(helpers.headPattern));
      expect('[_head1]', toMatch(helpers.headPattern));
      expect('[$head]', toMatch(helpers.headPattern));
      expect('[20]', not(toMatch(helpers.headPattern)));
      expect('[2head]', not(toMatch(helpers.headPattern)));
    });

    it('should match head and tail pattern', expect => {
      expect('[head, ...tail]', toMatch(helpers.headAndTailPattern));
      expect('[head,    ...tail]', toMatch(helpers.headAndTailPattern));
      expect('[_head, ...tail]', toMatch(helpers.headAndTailPattern));
      expect('[head1, ...tail]', toMatch(helpers.headAndTailPattern));
      expect('[_head1, ...tail]', toMatch(helpers.headAndTailPattern));
      expect('[$head, ...tail]', toMatch(helpers.headAndTailPattern));
      expect('[$head, ...$tail]', toMatch(helpers.headAndTailPattern));
      expect('[$head, ..._tail]', toMatch(helpers.headAndTailPattern));
      expect('[$head, ...1tail]', not(toMatch(helpers.headAndTailPattern)));
      expect('[20, ...tail]', not(toMatch(helpers.headAndTailPattern)));
      expect('[2head, ...tail]', not(toMatch(helpers.headAndTailPattern)));
      expect('[head, tail]', not(toMatch(helpers.headAndTailPattern)));
      expect('[head]', not(toMatch(helpers.headAndTailPattern)));
    });

    it('should match last pattern', expect => {
      expect('[..._, last]', toMatch(helpers.lastPattern));
      expect('[..._, _last]', toMatch(helpers.lastPattern));
      expect('[..._, $last]', toMatch(helpers.lastPattern));
      expect('[..._, last1]', toMatch(helpers.lastPattern));
      expect('[..._, 1last]', not(toMatch(helpers.lastPattern)));
      expect('[last]', not(toMatch(helpers.lastPattern)));
      expect('[..._]', not(toMatch(helpers.lastPattern)));
    });

    it('should match last and rest pattern', expect => {
      expect('[...rest, last]', toMatch(helpers.lastAndRestPattern));
      expect('[...rest, _last]', toMatch(helpers.lastAndRestPattern));
      expect('[...rest, $last]', toMatch(helpers.lastAndRestPattern));
      expect('[...rest, last1]', toMatch(helpers.lastAndRestPattern));
      expect('[..._, last]', toMatch(helpers.lastAndRestPattern));
      expect('[...rest, 1last]', not(toMatch(helpers.lastAndRestPattern)));
      expect('[last]', not(toMatch(helpers.lastAndRestPattern)));
      expect('[...rest]', not(toMatch(helpers.lastAndRestPattern)));
    });

    it('should match literal pattern', expect => {
      expect('"value"', toMatch(helpers.literalPattern));
      expect(`'value'`, toMatch(helpers.literalPattern));
      expect('1', toMatch(helpers.literalPattern));
      expect('10', toMatch(helpers.literalPattern));
      expect('1n', toMatch(helpers.literalPattern));
      expect('10n', toMatch(helpers.literalPattern));
      expect('true', toMatch(helpers.literalPattern));
      expect('false', toMatch(helpers.literalPattern));
      expect('null', toMatch(helpers.literalPattern));
      expect('undefined', toMatch(helpers.literalPattern));
      expect('a', not(toMatch(helpers.literalPattern)));
    });

    it('should match binary pattern', expect => {
      expect('value === 1', toMatch(helpers.binaryOperationPattern));
      expect('value != 1', toMatch(helpers.binaryOperationPattern));
      expect('value < 1', toMatch(helpers.binaryOperationPattern));
      expect('value <= 1', toMatch(helpers.binaryOperationPattern));
      expect('value >= 1', toMatch(helpers.binaryOperationPattern));
      expect('value > 1', toMatch(helpers.binaryOperationPattern));
      expect('value === true', toMatch(helpers.binaryOperationPattern));
      expect('value === false', toMatch(helpers.binaryOperationPattern));
      expect('value === null', toMatch(helpers.binaryOperationPattern));
      expect('value === undefined', toMatch(helpers.binaryOperationPattern));
      expect('array.length === 1', toMatch(helpers.binaryOperationPattern));
      expect('map.size === 1', toMatch(helpers.binaryOperationPattern));
      expect('array.length < 1', toMatch(helpers.binaryOperationPattern));
      expect('array["a"] === "a"', toMatch(helpers.binaryOperationPattern));
      expect('array[0] < 1', toMatch(helpers.binaryOperationPattern));
      expect('array[true] < 1', not(toMatch(helpers.binaryOperationPattern)));
    });

    it('should match truthy pattern', expect => {
      expect('?', toMatch(helpers.truthyPattern));
      expect('??', not(toMatch(helpers.truthyPattern)));
    });

    it('should match falsy pattern', expect => {
      expect('!', toMatch(helpers.falsyPattern));
    });

    it('should match exist pattern', expect => {
      expect('??', toMatch(helpers.existPattern));
      expect('?', not(toMatch(helpers.existPattern)));
    });

    it('should match regex pattern', expect => {
      expect(`/\\d/`, toMatch(helpers.regexPattern));
      expect('/\\w/i', toMatch(helpers.regexPattern));
      expect('/[a-zA-Z]+/ig', toMatch(helpers.regexPattern));
    });

    it('should match object property pattern', expect => {
      expect(`{property}`, toMatch(helpers.objectPropertyPattern));
      expect('{ property }', toMatch(helpers.objectPropertyPattern));
      expect('{}', not(toMatch(helpers.objectPropertyPattern)));
    });
  });

  describe('Value Getters', it => {
    it('should get head of array-like collection', expect => {
      expect(helpers.getOnlyItem([1]), toEqual(1));
      expect(helpers.getOnlyItem([1]), toEqual(1));
      expect(helpers.getOnlyItem('match'), toEqual('m'));
      expect(helpers.getOnlyItem('m'), toEqual('m'));
      expect(helpers.getOnlyItem(['match', 'pattern']), toEqual('match'));
    });

    it('should get head and tail of iterables', expect => {
      expect(helpers.getHeadAndTail([1, 2]), toEqual([1, [2]]));
      expect(helpers.getHeadAndTail([1]), toEqual([1, []]));
      expect(helpers.getHeadAndTail('match'), toEqual(['m', 'atch']));
      expect(helpers.getHeadAndTail('m'), toEqual(['m', '']));
      expect(
        helpers.getHeadAndTail(['match', 'pattern']),
        toEqual(['match', ['pattern']])
      );
      expect(
        helpers.getHeadAndTail(new Set([1, 2])),
        toEqual([1, new Set([2])])
      );
      expect(
        helpers.getHeadAndTail(
          new Map([
            [1, 1],
            [2, 2]
          ])
        ),
        toEqual([[1, 1], new Map([[2, 2]])])
      );
    });

    it('should get the last element of array-like collection', expect => {
      expect(helpers.getLast([1, 2]), toEqual(2));
      expect(helpers.getLast([1]), toEqual(1));
      expect(helpers.getLast('match'), toEqual('h'));
      expect(helpers.getLast('m'), toEqual('m'));
      expect(helpers.getLast(['match', 'pattern']), toEqual('pattern'));
    });

    it('should get the last and the rest of the elements of an iterable', expect => {
      expect(helpers.getLastAndRest([1, 2]), toEqual([[1], 2]));
      expect(helpers.getLastAndRest([1]), toEqual([[], 1]));
      expect(helpers.getLastAndRest('match'), toEqual(['matc', 'h']));
      expect(helpers.getLastAndRest('m'), toEqual(['', 'm']));
      expect(
        helpers.getLastAndRest(['match', 'pattern']),
        toEqual([['match'], 'pattern'])
      );
      expect(
        helpers.getLastAndRest(new Set([1, 2])),
        toEqual([new Set([1]), 2])
      );
      expect(
        helpers.getLastAndRest(
          new Map([
            [1, 1],
            [2, 2]
          ])
        ),
        toEqual([new Map([[1, 1]]), [2, 2]])
      );
    });

    it('should get object property', expect => {
      const property = helpers.getObjectProperty('{property}');
      expect(property, toEqual('property'));
    });
  });

  describe('getMatches', it => {
    it('should get regex group matches', expect => {
      expect(helpers.getMatches('1', /(\d)/), toEqual(['1']));
      expect(helpers.getMatches('123', /(\d+)/), toEqual(['123']));
      expect(helpers.getMatches('match', /(\w+)/), toEqual(['match']));
      expect(helpers.getMatches('match', /([a-z])/), toEqual(['m']));
      expect(
        helpers.getMatches('1 match', /(\d)\s([a-z])/),
        toEqual(['1', 'm'])
      );
    });
  });

  describe('getPatternValue', it => {
    it('should get pattern values', expect => {
      expect(helpers.getPatternValue(`'match'`), toEqual('match'));
      expect(helpers.getPatternValue('"match"'), toEqual('match'));
      expect(helpers.getPatternValue('1'), toEqual(1));
      expect(helpers.getPatternValue('1n'), toEqual(BigInt(1)));
      expect(helpers.getPatternValue('null'), toEqual(null));
      expect(helpers.getPatternValue('undefined'), toEqual(undefined));
    });
  });

  describe('getBinaryOpMatcher', it => {
    it('should get matcher for number binary operation patterns', expect => {
      const [isLessThan1] = helpers.getBinaryOpMatcher('value < 1');
      expect(isLessThan1(0), toEqual(true));
    });

    it('should get matcher for bigint binary operation patterns', expect => {
      const [isLessThan1n] = helpers.getBinaryOpMatcher('value < 1n');
      expect(isLessThan1n(0n), toEqual(true));
    });

    it('should get matcher for string binary operation patterns', expect => {
      const [equalsA] = helpers.getBinaryOpMatcher('value === "a"');
      expect(equalsA('a'), toEqual(true));
    });

    it('should get matcher for property accessor binary operation patterns', expect => {
      const [equalsA, getValue] = helpers.getBinaryOpMatcher(
        'object.value === "a"'
      );

      const [isLessThan1, getItem] = helpers.getBinaryOpMatcher('array[0] < 1');

      const [equalsAge, getAge] = helpers.getBinaryOpMatcher(
        'person["age"] === 23'
      );

      expect(equalsA('a'), toEqual(true));
      expect(getValue({ value: 'a' }), toEqual('a'));
      expect(isLessThan1(0), toEqual(true));
      expect(getItem([0]), toEqual(0));
      expect(equalsAge(23), toEqual(true));
      expect(getAge({ age: 23 }), toEqual(23));
    });
  });

  describe('getMatcher', it => {
    it('should get literal matcher', expect => {
      const [equals1, get1] = helpers.getMatcher('1');
      const [equals1n, get1n] = helpers.getMatcher('1n');
      const [equalsMatch, getMatch] = helpers.getMatcher('"match"');
      expect(equals1(1), toEqual(true));
      expect(equals1(2), toEqual(false));
      expect(get1(1), toEqual(1));
      expect(equals1n(1n), toEqual(true));
      expect(equals1n(2n), toEqual(false));
      expect(get1n(1n), toEqual(1n));
      expect(equalsMatch('match'), toEqual(true));
      expect(equalsMatch('Match'), toEqual(false));
      expect(getMatch('match'), toEqual('match'));
    });

    it('should get matcher for any', expect => {
      const [isAny, getAny] = helpers.getMatcher('_');
      expect(isAny(1), toEqual(true));
      expect(isAny(2), toEqual(true));
      expect(isAny(1n), toEqual(true));
      expect(isAny({}), toEqual(true));
      expect(isAny([]), toEqual(true));
      expect(isAny('match'), toEqual(true));
      expect(isAny(null), toEqual(true));
      expect(isAny(undefined), toEqual(true));
      expect(getAny(1), toEqual(1));
    });

    it('should get empty matcher', expect => {
      const [hasLength0] = helpers.getMatcher('[]');
      expect(hasLength0([]), toEqual(true));
      expect(hasLength0(''), toEqual(true));
      expect(hasLength0([1]), not(toEqual(true)));
      expect(hasLength0('m'), not(toEqual(true)));
    });

    it('should get only item matcher', expect => {
      const arr = [1];
      const [hasLength1, getOnlyItem] = helpers.getMatcher('[head]');
      expect(hasLength1(arr), toEqual(true));
      expect(getOnlyItem(arr), toEqual(1));
      expect(getOnlyItem(arr), not(toEqual(2)));
    });

    it('should get head and tail matcher', expect => {
      const arr = [1, 2],
        arr1 = [1];
      const [hasMinLength1, getHeadAndTail] =
        helpers.getMatcher('[head, ...tail]');
      expect(hasMinLength1(arr), toEqual(true));
      expect(getHeadAndTail(arr), toEqual([1, [2]]));
      expect(getHeadAndTail(arr), not(toEqual([1, []])));
      expect(getHeadAndTail(arr1), toEqual([1, []]));
    });

    it('should get matcher for last', expect => {
      const arr = [1, 2];
      const [hasMinLength1, getLast] = helpers.getMatcher('[..._, last]');
      expect(hasMinLength1(arr), toEqual(true));
      expect(getLast(arr), toEqual(2));
      expect(getLast(arr), not(toEqual(1)));
    });

    it('should get matcher for last and rest', expect => {
      const arr = [1, 2];
      const [hasMinLength1, getLastAndRest] =
        helpers.getMatcher('[...rest, last]');
      expect(hasMinLength1(arr), toEqual(true));
      expect(getLastAndRest(arr), toEqual([[1], 2]));
    });

    it('should get matcher for binary operations', expect => {
      const [isLessThan1, get1] = helpers.getMatcher('value < 1');
      const [isLessThanOrEqual1] = helpers.getMatcher('value <= 1');
      const [equals1] = helpers.getMatcher('value === 1');
      const [isGreaterThanOrEqual1] = helpers.getMatcher('value >= 1');
      const [isGreaterThan1] = helpers.getMatcher('value > 1');
      const [isNotEqualTo1] = helpers.getMatcher('value != 1');

      expect(get1(1), toEqual(1));
      expect(isLessThan1(0), toEqual(true));
      expect(isLessThan1(1), toEqual(false));
      expect(isLessThanOrEqual1(1), toEqual(true));
      expect(equals1(1), toEqual(true));
      expect(isGreaterThanOrEqual1(1), toEqual(true));
      expect(isGreaterThan1(2), toEqual(true));
      expect(isNotEqualTo1(0), toEqual(true));
    });

    it('should get matcher for truthy', expect => {
      const [isTruthy] = helpers.getMatcher('?');

      expect(isTruthy(true), toEqual(true));
      expect(isTruthy(false), toEqual(false));
      expect(isTruthy(1), toEqual(true));
      expect(isTruthy(0), toEqual(false));
    });

    it('should get matcher for falsy', expect => {
      const [isFalsy] = helpers.getMatcher('!');

      expect(isFalsy(false), toEqual(true));
      expect(isFalsy(true), toEqual(false));
      expect(isFalsy(1), toEqual(false));
      expect(isFalsy(0), toEqual(true));
    });

    it('should get matcher for exist', expect => {
      const [exists] = helpers.getMatcher('??');

      expect(exists(true), toEqual(true));
      expect(exists(false), toEqual(true));
      expect(exists(1), toEqual(true));
      expect(exists(0), toEqual(true));
      expect(exists(null), toEqual(false));
      expect(exists(undefined), toEqual(false));
    });

    it('should get matcher for regex', expect => {
      const [matchesNumber] = helpers.getMatcher('/\\d+/');
      const [matchesUsername] = helpers.getMatcher('/@\\w+/');
      const [matchesAlphanumeric] = helpers.getMatcher('/[a-zA-Z0-9]/');

      expect(matchesNumber('1'), toEqual(true));
      expect(matchesNumber('a'), toEqual(false));
      expect(matchesUsername('@match_1'), toEqual(true));
      expect(matchesUsername('match'), toEqual(false));
      expect(matchesAlphanumeric('match'), toEqual(true));
      expect(matchesAlphanumeric('_'), toEqual(false));
    });

    it('should get matcher for object property', expect => {
      const object = { property: 'value' };
      const [hasProperty, getProperty] = helpers.getMatcher('{property}');
      expect(hasProperty(object), toEqual(true));
      expect(getProperty(object), toEqual('value'));
    });
  });
};

export const run = () => mod('MatchPattern Helpers', runMatchPatternHelpers);
