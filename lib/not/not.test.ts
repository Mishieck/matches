import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { equals } from '../equals/equals.ts';
import { not } from './not.ts';

export const runNot: ModuleRunner = describe => {
  describe('not', it => {
    it('should handle negation', expect => {
      expect(not(equals(true))(false), toEqual(true));
      expect(not(equals(1))(2), toEqual(true));
      expect(not(equals(1))(1), toEqual(false));
    });
  });
};

export const run = mod('Not', runNot);
