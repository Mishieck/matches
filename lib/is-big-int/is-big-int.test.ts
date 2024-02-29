import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isBigInt } from './is-big-int.ts';

export const runIsBigInt: ModuleRunner = describe => {
  describe('isBigInt', it => {
    it('should check if a value is a big int', expect => {
      expect(isBigInt()(1n), toEqual(true));
      expect(isBigInt()(1), toEqual(false));
    });
  });
};

export const run = mod('IsBigInt', runIsBigInt);
