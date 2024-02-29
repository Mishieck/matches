import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isEmpty } from './is-empty.ts';

export const runIsEmpty: ModuleRunner = describe => {
  describe('isEmpty', it => {
    it('should check if a given value is empty', expect => {
      expect(isEmpty()([]), toEqual(true));
      expect(isEmpty()(''), toEqual(true));
      expect(isEmpty()(new Set()), toEqual(true));
      expect(isEmpty()(new Map()), toEqual(true));
      expect(isEmpty()([1]), toEqual(false));
    });
  });
};

export const run = mod('IsEmpty', runIsEmpty);
