import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isNull } from './is-null.ts';

export const runIsNull: ModuleRunner = describe => {
  describe('isNull', it => {
    it('should check if a given value is null', expect => {
      expect(isNull()(null), toEqual(true));
      expect(isNull()(undefined), toEqual(false));
      expect(isNull()(false), toEqual(false));
    });
  });
};

export const run = mod('IsNull', runIsNull);
