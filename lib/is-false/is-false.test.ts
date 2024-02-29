import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isFalse } from './is-false.ts';

export const runIsFalse: ModuleRunner = describe => {
  describe('isFalse', it => {
    it('should check if a given value is false', expect => {
      expect(isFalse()(false), toEqual(true));
      expect(isFalse()(0), toEqual(false));
    });
  });
};

export const run = mod('IsFalse', runIsFalse);
