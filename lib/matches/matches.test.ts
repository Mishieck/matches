import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { matches } from './matches.ts';

export const runMatches: ModuleRunner = describe => {
  describe('matches', it => {
    it('should checks if a given value matches a particular regex', expect => {
      expect(matches(/\w/)('Match'), toEqual(true));
      expect(matches(/\d/)('Match'), toEqual(false));
    });
  });
};

export const run = mod('Matches', runMatches);
