import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { hasMinSize } from './has-min-size.ts';

export const runHasMinSize: ModuleRunner = describe => {
  describe('hasMinSize', it => {
    it('should check if a set or map has a given size', expect => {
      expect(hasMinSize(1)(new Set([1])), toEqual(true));
      expect(hasMinSize(1)(new Map([[1, 1]])), toEqual(true));
    });
  });
};

export const run = mod('HasMinSize', runHasMinSize);
