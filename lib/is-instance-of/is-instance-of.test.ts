import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isInstanceOf } from './is-instance-of.ts';

export const runIsInstanceOf: ModuleRunner = describe => {
  describe('isInstanceOf', it => {
    it('should check if a given value is an instance of a class', expect => {
      expect(isInstanceOf(Object)({}), toEqual(true));
      expect(isInstanceOf(Object)([]), toEqual(true));
      expect(isInstanceOf(Array)([]), toEqual(true));
      expect(isInstanceOf(String)(new String('')), toEqual(true));
      expect(isInstanceOf(Object)(true), toEqual(false));
    });
  });
};

export const run = mod('IsInstanceOf', runIsInstanceOf);
