import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isRecord } from './is-record.ts';

export const runIsRecord: ModuleRunner = describe => {
  describe('isRecord', it => {
    it('should check if a given value is a record', expect => {
      expect(isRecord()({}), toEqual(true));
      expect(isRecord()(null), toEqual(false));
      expect(isRecord()([]), toEqual(false));
      expect(isRecord()(new String('')), toEqual(false));
    });
  });
};

export const run = mod('IsRecord', runIsRecord);
