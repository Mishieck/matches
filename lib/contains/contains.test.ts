import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { contains } from './contains.ts';

export const runContains: ModuleRunner = describe => {
  describe('contains', it => {
    it('should check if an iterable contains a particular item', expect => {
      expect(contains(1)([1]), toEqual(true));
      expect(contains('c')('code'), toEqual(true));
      expect(contains(1)(new Set([1])), toEqual(true));
      expect(contains(0)(new Map([[1, 0]])), toEqual(true));
      expect(contains(2)([1]), toEqual(false));
    });
  });
};

export const run = mod('Contains', runContains);
