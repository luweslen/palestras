import fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import fg from 'fast-glob';

const packageFiles = (await fg('20*/package.json', {
  onlyFiles: true,
})).sort();

const bases = (await Promise.all(
  packageFiles.map(async (file) => {
    const talkRoot = dirname(file);
    const json = JSON.parse(await fs.readFile(file, 'utf-8'));
    const pdfFile = (await fg('*.pdf', {
      cwd: resolve(process.cwd(), talkRoot),
      onlyFiles: true,
    }))[0];
    const command = json.scripts?.build;
    if (!command)
      return;
    // Extract base from build command if present, otherwise use folder name
    const base = `/${talkRoot}/`;
    return {
      dir: talkRoot,
      base,
      pdfFile,
    };
  }),
))
  .filter((item): item is { dir: string; base: string; pdfFile: string } => Boolean(item));

const redirects = bases.length > 0
  ? bases
      .flatMap(({ base, pdfFile, dir }) => {
        const parts: string[] = [];

        if (pdfFile) {
          parts.push(`
[[redirects]]
from = "${base}pdf"
to = "https://github.com/luweslen/palestras/blob/main/${dir}/${pdfFile}?raw=true"
status = 302

[[redirects]]
from = "/${dir}/pdf"
to = "https://github.com/luweslen/palestras/blob/main/${dir}/${pdfFile}?raw=true"
status = 302`);
        }

        parts.push(`
[[redirects]]
from = "${base}src"
to = "https://github.com/luweslen/palestras/tree/main/${dir}"
status = 302`);

        parts.push(`
[[redirects]]
from = "${base}*"
to = "${base}index.html"
status = 200`);

        return parts;
      })
      .join('\n')
  : '';

const content = `[build]
publish = "dist"
command = "yarn build"

[build.environment]
NODE_VERSION = "20"
PLAYWRIGHT_BROWSERS_PATH = "0"

${redirects}

[[redirects]]
from = "/"
to = "https://github.com/luweslen/palestras"
status = 302
`;

await fs.writeFile('netlify.toml', content, 'utf-8');
console.log('netlify.toml atualizado!');
