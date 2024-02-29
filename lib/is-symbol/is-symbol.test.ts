import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isSymbol } from './is-symbol.ts';

export const runIsSymbol: ModuleRunner = describe => {
  describe('isSymbol', it => {
    it('should check if a given value is a symbol', expect => {
      expect(isSymbol()(Symbol(1)), toEqual(true));
      expect(isSymbol()(1), toEqual(false));
    });
  });
};

export const run = mod('IsSymbol', runIsSymbol);
