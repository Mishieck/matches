import {
  run,
  type ModuleImporter,
  type TestModule,
  type TestRunner
} from '../deps.ts';

const { createTestRunner, isTSFile } = run;
const relative = '../'; // Relative path of entry directory
// Absolute path of entry directory
// Checkout run.getPaths for equivalent in Node
const absolute = new URL(relative, import.meta.url).pathname;
const entry = { relative, absolute };
const importModule: ModuleImporter = path => import(path);
// Assuming the test files export run
const getTestRunner = (mod: TestModule) => mod.run as TestRunner;

const runTSTests = createTestRunner({
  entry,
  isMatch: isTSFile,
  importModule,
  getTestRunner
});

runTSTests();
