import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isFalsy } from './is-falsy.ts';

export const runIsFalsy: ModuleRunner = describe => {
  describe('isFalsy', it => {
    it('should check if a given value is falsy', expect => {
      expect(isFalsy()(false), toEqual(true));
      expect(isFalsy()(''), toEqual(true));
      expect(isFalsy()(null), toEqual(true));
      expect(isFalsy()(undefined), toEqual(true));
      expect(isFalsy()(true), toEqual(false));
      expect(isFalsy()(1), toEqual(false));
      expect(isFalsy()({}), toEqual(false));
      expect(isFalsy()([]), toEqual(false));
    });
  });
};

export const run = mod('IsFalsy', runIsFalsy);
