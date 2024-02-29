import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { matches } from './matches.ts';

export const runMatches: ModuleRunner = describe => {
  describe('matches', it => {
    it('should handle regexes', expect => {
      expect(matches(/\w/)('Match'), toEqual(true));
      expect(matches(/\d/)('Match'), toEqual(false));
    });
  });
};

export const run = mod('Matches', runMatches);
