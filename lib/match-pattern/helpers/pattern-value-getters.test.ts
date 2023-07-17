import { mod, toEqual, type ModuleRunner, expect } from '../../../deps.ts';
import * as patternValueGetters from './pattern-value-getters.ts';

export const runPatternValueGetterTests: ModuleRunner = describe => {
  describe('getMatches', it => {
    it('should get regex group matches', expect => {
      expect(patternValueGetters.getMatches('1', /(\d)/), toEqual(['1']));
      expect(patternValueGetters.getMatches('123', /(\d+)/), toEqual(['123']));
      expect(
        patternValueGetters.getMatches('match', /(\w+)/),
        toEqual(['match'])
      );
      expect(
        patternValueGetters.getMatches('match', /([a-z])/),
        toEqual(['m'])
      );
      expect(
        patternValueGetters.getMatches('1 match', /(\d)\s([a-z])/),
        toEqual(['1', 'm'])
      );
    });
  });

  describe('getLiteral', it => {
    it('should get pattern values', expect => {
      expect(patternValueGetters.getLiteral(`'match'`), toEqual('match'));
      expect(patternValueGetters.getLiteral('"match"'), toEqual('match'));
      expect(patternValueGetters.getLiteral('1'), toEqual(1));
      expect(patternValueGetters.getLiteral('1n'), toEqual(BigInt(1)));
      expect(patternValueGetters.getLiteral('null'), toEqual(null));
      expect(patternValueGetters.getLiteral('undefined'), toEqual(undefined));
    });
  });

  describe('getRegex', it => {
    it('should get pattern regex', expect => {
      expect(patternValueGetters.getRegex('/\\d/'), toEqual(/\d/));
      expect(patternValueGetters.getRegex('/@[a-z]/'), toEqual(/@[a-z]/));
    });
  });

  describe('getObjectProperty', it => {
    it('should get object property', expect => {
      const simpleProperty =
        patternValueGetters.getObjectProperty('{property}');

      const stringProperty = patternValueGetters.getObjectProperty(
        '{["property-name"]}'
      );

      const numberProperty = patternValueGetters.getObjectProperty('{[0]}');

      expect(simpleProperty, toEqual('property'));
      expect(stringProperty, toEqual('property-name'));
      expect(numberProperty, toEqual('0'));
    });
  });

  describe('getObjectProperties', it => {
    it('should get object properties', expect => {
      const properties = patternValueGetters.getObjectProperties(
        '{ property, ...rest }'
      );

      const propertiesWithStringProperty =
        patternValueGetters.getObjectProperties(
          '{ ["computed-property"], ...rest }'
        );

      const propertiesWithNumberProperty =
        patternValueGetters.getObjectProperties('{ [0], ...rest }');

      expect(properties, toEqual(['property', 'rest']));
      expect(
        propertiesWithStringProperty,
        toEqual(['computed-property', 'rest'])
      );
      expect(propertiesWithNumberProperty, toEqual(['0', 'rest']));
    });
  });

  describe('getBinaryTerms', it => {
    it('should get binary terms for primitives', expect => {
      expect(
        patternValueGetters.getBinaryTerms('value < 1'),
        toEqual(['', '<', 1])
      );

      expect(
        patternValueGetters.getBinaryTerms('value < 1n'),
        toEqual(['', '<', 1n])
      );

      expect(
        patternValueGetters.getBinaryTerms('value === "match"'),
        toEqual(['', '===', 'match'])
      );

      expect(
        patternValueGetters.getBinaryTerms('value != null'),
        toEqual(['', '!=', null])
      );
    });

    it('should get binary terms for property access', expect => {
      expect(
        patternValueGetters.getBinaryTerms('object.property === "value"'),
        toEqual(['property', '===', 'value'])
      );

      expect(
        patternValueGetters.getBinaryTerms('array[0] === 1'),
        toEqual([0, '===', 1])
      );

      expect(
        patternValueGetters.getBinaryTerms('array[0] < 1'),
        toEqual([0, '<', 1])
      );

      expect(
        patternValueGetters.getBinaryTerms('object["property"] === "value"'),
        toEqual(['property', '===', 'value'])
      );
    });
  });
};

export const run = () => mod('patternValueGetters', runPatternValueGetterTests);
