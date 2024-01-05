import { build, emptyDir } from 'https://deno.land/x/dnt@0.35.0/mod.ts';

await emptyDir('./npm');

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    deno: true
  },
  package: {
    // package.json properties
    name: '@mishieck/matches',
    version: Deno.args[0],
    description: `
      A library for testing the nature of data. It provides functions that can 
      be used to test both primitive and object types.
    `,
    license: 'Apache 2.0',
    repository: {
      type: 'git',
      url: 'git+https://github.com/Mishieck/matches.git'
    },
    keywords: ['match', 'matches'],
    bugs: {
      url: 'https://github.com/Mishieck/matches/issues'
    },
    author: {
      name: 'Mishieck Mwale',
      email: 'mishieckdev@gmail.com'
    }
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync('LICENSE', 'npm/LICENSE');
    Deno.copyFileSync('README.md', 'npm/README.md');
  }
});
