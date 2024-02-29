import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isTrue } from './is-true.ts';

export const runIsTrue: ModuleRunner = describe => {
  describe('isTrue', it => {
    it('should check if a given value is true', expect => {
      expect(isTrue()(true), toEqual(true));
      expect(isTrue()(false), toEqual(false));
    });
  });
};

export const run = mod('IsTrue', runIsTrue);
