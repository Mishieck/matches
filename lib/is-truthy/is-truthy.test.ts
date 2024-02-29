import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isTruthy } from './is-truthy.ts';

export const runIsTruthy: ModuleRunner = describe => {
  describe('isTruthy', it => {
    it('should check if a given value is truthy', expect => {
      expect(isTruthy()(true), toEqual(true));
      expect(isTruthy()(1), toEqual(true));
      expect(isTruthy()({}), toEqual(true));
      expect(isTruthy()([]), toEqual(true));
      expect(isTruthy()(false), toEqual(false));
      expect(isTruthy()(''), toEqual(false));
      expect(isTruthy()(null), toEqual(false));
      expect(isTruthy()(undefined), toEqual(false));
    });
  });
};

export const run = mod('IsTruthy', runIsTruthy);
