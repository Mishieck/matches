import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { equals } from './equals.ts';

export const runEquals: ModuleRunner = describe => {
  describe('equals', it => {
    it('should check if a given value is equal to another value', expect => {
      expect(equals(true)(true), toEqual(true));
      expect(equals(true)(false), toEqual(false));
    });
  });
};

export const run = mod('Equals', runEquals);
