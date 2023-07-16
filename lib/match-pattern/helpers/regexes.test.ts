import { type ModuleRunner, mod, toMatch, not } from '../../../deps.ts';
import * as regexes from './regexes.ts';

export const runRegexesTests: ModuleRunner = describe => {
  describe('Regexes', it => {
    it('should match any pattern', expect => {
      expect('_', toMatch(regexes.anyPattern));
      expect('_a', not(toMatch(regexes.anyPattern)));
      expect('a_', not(toMatch(regexes.anyPattern)));
      expect('a_1', not(toMatch(regexes.anyPattern)));
    });

    it('should match empty pattern', expect => {
      expect('[]', toMatch(regexes.emptyPattern));
      expect('[_]', not(toMatch(regexes.emptyPattern)));
    });

    it('should match head pattern', expect => {
      expect('[_]', toMatch(regexes.headPattern));
      expect('[head]', toMatch(regexes.headPattern));
      expect('[_head]', toMatch(regexes.headPattern));
      expect('[head1]', toMatch(regexes.headPattern));
      expect('[_head1]', toMatch(regexes.headPattern));
      expect('[$head]', toMatch(regexes.headPattern));
      expect('[20]', not(toMatch(regexes.headPattern)));
      expect('[2head]', not(toMatch(regexes.headPattern)));
    });

    it('should match head and tail pattern', expect => {
      expect('[head, ...tail]', toMatch(regexes.headAndTailPattern));
      expect('[head,    ...tail]', toMatch(regexes.headAndTailPattern));
      expect('[_head, ...tail]', toMatch(regexes.headAndTailPattern));
      expect('[head1, ...tail]', toMatch(regexes.headAndTailPattern));
      expect('[_head1, ...tail]', toMatch(regexes.headAndTailPattern));
      expect('[$head, ...tail]', toMatch(regexes.headAndTailPattern));
      expect('[$head, ...$tail]', toMatch(regexes.headAndTailPattern));
      expect('[$head, ..._tail]', toMatch(regexes.headAndTailPattern));
      expect('[$head, ...1tail]', not(toMatch(regexes.headAndTailPattern)));
      expect('[20, ...tail]', not(toMatch(regexes.headAndTailPattern)));
      expect('[2head, ...tail]', not(toMatch(regexes.headAndTailPattern)));
      expect('[head, tail]', not(toMatch(regexes.headAndTailPattern)));
      expect('[head]', not(toMatch(regexes.headAndTailPattern)));
    });

    it('should match last pattern', expect => {
      expect('[..._, last]', toMatch(regexes.lastPattern));
      expect('[..._, _last]', toMatch(regexes.lastPattern));
      expect('[..._, $last]', toMatch(regexes.lastPattern));
      expect('[..._, last1]', toMatch(regexes.lastPattern));
      expect('[..._, 1last]', not(toMatch(regexes.lastPattern)));
      expect('[last]', not(toMatch(regexes.lastPattern)));
      expect('[..._]', not(toMatch(regexes.lastPattern)));
    });

    it('should match last and rest pattern', expect => {
      expect('[...rest, last]', toMatch(regexes.lastAndRestPattern));
      expect('[...rest, _last]', toMatch(regexes.lastAndRestPattern));
      expect('[...rest, $last]', toMatch(regexes.lastAndRestPattern));
      expect('[...rest, last1]', toMatch(regexes.lastAndRestPattern));
      expect('[..._, last]', toMatch(regexes.lastAndRestPattern));
      expect('[...rest, 1last]', not(toMatch(regexes.lastAndRestPattern)));
      expect('[last]', not(toMatch(regexes.lastAndRestPattern)));
      expect('[...rest]', not(toMatch(regexes.lastAndRestPattern)));
    });

    it('should match literal pattern', expect => {
      expect('"value"', toMatch(regexes.literalPattern));
      expect(`'value'`, toMatch(regexes.literalPattern));
      expect('1', toMatch(regexes.literalPattern));
      expect('10', toMatch(regexes.literalPattern));
      expect('1n', toMatch(regexes.literalPattern));
      expect('10n', toMatch(regexes.literalPattern));
      expect('true', toMatch(regexes.literalPattern));
      expect('false', toMatch(regexes.literalPattern));
      expect('null', toMatch(regexes.literalPattern));
      expect('undefined', toMatch(regexes.literalPattern));
      expect('a', not(toMatch(regexes.literalPattern)));
    });

    it('should match binary pattern', expect => {
      expect('value === 1', toMatch(regexes.binaryOperationPattern));
      expect('value != 1', toMatch(regexes.binaryOperationPattern));
      expect('value < 1', toMatch(regexes.binaryOperationPattern));
      expect('value <= 1', toMatch(regexes.binaryOperationPattern));
      expect('value >= 1', toMatch(regexes.binaryOperationPattern));
      expect('value > 1', toMatch(regexes.binaryOperationPattern));
      expect('value === true', toMatch(regexes.binaryOperationPattern));
      expect('value === false', toMatch(regexes.binaryOperationPattern));
      expect('value === null', toMatch(regexes.binaryOperationPattern));
      expect('value === undefined', toMatch(regexes.binaryOperationPattern));
      expect('array.length === 1', toMatch(regexes.binaryOperationPattern));
      expect('map.size === 1', toMatch(regexes.binaryOperationPattern));
      expect('array.length < 1', toMatch(regexes.binaryOperationPattern));
      expect('array["a"] === "a"', toMatch(regexes.binaryOperationPattern));
      expect('array[0] < 1', toMatch(regexes.binaryOperationPattern));
      expect('array[true] < 1', not(toMatch(regexes.binaryOperationPattern)));
    });

    it('should match truthy pattern', expect => {
      expect('?', toMatch(regexes.truthyPattern));
      expect('??', not(toMatch(regexes.truthyPattern)));
    });

    it('should match falsy pattern', expect => {
      expect('!', toMatch(regexes.falsyPattern));
    });

    it('should match exist pattern', expect => {
      expect('??', toMatch(regexes.existPattern));
      expect('?', not(toMatch(regexes.existPattern)));
    });

    it('should match regex pattern', expect => {
      expect(`/\\d/`, toMatch(regexes.regexPattern));
      expect('/\\w/i', toMatch(regexes.regexPattern));
      expect('/[a-zA-Z]+/ig', toMatch(regexes.regexPattern));
    });

    it('should match object property pattern', expect => {
      expect(`{property}`, toMatch(regexes.objectPropertyPattern));
      expect('{ property }', toMatch(regexes.objectPropertyPattern));
      expect('{}', not(toMatch(regexes.objectPropertyPattern)));
    });

    it('should match object properties pattern', expect => {
      expect(`{property, ...rest}`, toMatch(regexes.objectPropertiesPattern));
      expect('{ property, ...rest }', toMatch(regexes.objectPropertiesPattern));
      expect('{property}', not(toMatch(regexes.objectPropertiesPattern)));
      expect('{...rest}', not(toMatch(regexes.objectPropertiesPattern)));
    });
  });
};

export const run = () => mod('Pattern Regexes', runRegexesTests);
