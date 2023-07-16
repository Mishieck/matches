import { mod, toEqual, type ModuleRunner } from '../../../deps.ts';
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
      const property = patternValueGetters.getObjectProperty('{property}');
      expect(property, toEqual('property'));
    });
  });

  describe('getObjectProperties', it => {
    it('should get object properties', expect => {
      const properties = patternValueGetters.getObjectProperties(
        '{ property, ...rest }'
      );
      expect(properties, toEqual(['property', 'rest']));
    });
  });
};

export const run = () => mod('patternValueGetters', runPatternValueGetterTests);
