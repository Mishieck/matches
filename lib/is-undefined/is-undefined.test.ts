import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isUndefined } from './is-undefined.ts';

export const runIsUndefined: ModuleRunner = describe => {
  describe('isUndefined', it => {
    it('should check if a given value is undefined', expect => {
      expect(isUndefined()(undefined), toEqual(true));
      expect(isUndefined()(null), toEqual(false));
      expect(isUndefined()(false), toEqual(false));
    });
  });
};

export const run = mod('IsUndefined', runIsUndefined);
