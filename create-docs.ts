type MdList = Array<string>;
type MdSection = [heading: string, list: MdList];

const getNamesFromContent = (content: string) => (pattern: RegExp) =>
  (content.match(pattern) ?? [])
    .slice(1)
    .map(match => match.split(/\s/).pop())
    .sort() as MdList;

const createMdListItem = (item: string) => `  - [${item}](${apiPath})`;

const createMdList = (items: MdList) => items.map(createMdListItem).join('\n');

const createMdSection = (heading: string, list: MdList) =>
  `## ${heading}\n\n${createMdList(list)}`;

const functionsPath = new URL('./lib/functions.ts', import.meta.url).pathname;
const templatePath = new URL('./readme.template.md', import.meta.url).pathname;
const docsPath = new URL('./README.md', import.meta.url).pathname;

const apiPath =
  'https://github.com/Mishieck/matches/blob/main/lib/functions.ts';

const valuePattern = /export\sconst\s([\w]+)/g;
const typePattern = /export\stype\s([\w]+)/g;
const template = Deno.readTextFileSync(templatePath);
const content = Deno.readTextFileSync(functionsPath);
const getNames = getNamesFromContent(content);

const valueNames = getNames(valuePattern);
const typeNames = getNames(typePattern);

const sections: Array<MdSection> = [
  ['Functions', valueNames],
  ['Types', typeNames]
];

const api = `# API\n\n${sections
  .map(section => createMdSection(...section))
  .join('\n\n')}`;

const docs = template.replace('[DOCS]', api);
Deno.writeTextFileSync(docsPath, docs);

console.log({ functionsPath, valueNames, typeNames, docs });
