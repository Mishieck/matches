import { relative } from 'https://deno.land/std@0.182.0/path/mod.ts';

const pathnames = ['mod.template.ts', 'mod.ts', 'lib'];

const [templatePath, modulePath, libPath] = pathnames.map(
  name => new URL(`../${name}`, import.meta.url).pathname
);

const getRelativePath = (from: string) => (to: string) =>
  relative(from, to).substring(1);

const createExportStatement = (path: string) => `export * from '${path}';`;
const joinStatements = (statements: Array<string>) => statements.join('\n');

const getModulePaths = async (dir: string) => {
  const paths: Array<string> = [];

  for await (const { isSymlink, isFile, name } of Deno.readDir(dir)) {
    if (isSymlink || name.endsWith('.test.ts')) continue;
    const path = `${dir}/${name}`;

    if (isFile) paths.push(path);
    else paths.push(...(await getModulePaths(path)));
  }

  return paths;
};

const exportStatements = (await getModulePaths(libPath))
  .map(getRelativePath(modulePath))
  .map(createExportStatement);

const exportCode = joinStatements(exportStatements);
const template = await Deno.readTextFile(templatePath);
const code = template.replace(/'EXPORTS';/, exportCode);
await Deno.writeTextFile(modulePath, code);
