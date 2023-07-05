import { pack } from './deps.ts';
import { runMatchHelpers } from './lib/match/helpers.test.ts';
import { runMatch } from './lib/match/match.test.ts';

// Runs the modules in this file and imported files
pack('Matches', mod => {
  mod('MatchHelpers', runMatchHelpers);
  mod('Match', runMatch);
});
