import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isAny } from './is-any.ts';

export const runIsAny: ModuleRunner = describe => {
  describe('isAny', it => {
    it('should check if a value is on any type', expect => {
      expect(isAny()(true), toEqual(true));
      expect(isAny()(''), toEqual(true));
      expect(isAny()(1), toEqual(true));
      expect(isAny()(1n), toEqual(true));
      expect(isAny()({}), toEqual(true));
      expect(isAny()([]), toEqual(true));
      expect(isAny()(Symbol(1)), toEqual(true));
      expect(isAny()(null), toEqual(true));
      expect(isAny()(undefined), toEqual(true));
    });
  });
};

export const run = mod('IsAny', runIsAny);
