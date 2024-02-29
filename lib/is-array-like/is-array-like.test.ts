import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isArrayLike } from './is-array-like.ts';

export const runIsArrayLike: ModuleRunner = describe => {
  describe('isArrayLike', it => {
    it('should check if a given value is an ArrayLike collection', expect => {
      expect(isArrayLike()([]), toEqual(true));
      expect(isArrayLike()(''), toEqual(true));
      expect(isArrayLike()({}), toEqual(false));
    });
  });
};

export const run = mod('IsArrayLike', runIsArrayLike);
