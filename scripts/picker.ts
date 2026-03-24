import fs from 'node:fs/promises';
import process from 'node:process';
import { execa } from 'execa';
import prompts from 'prompts';

async function startPicker(args: string[]) {
  const folders = await Promise.all(
    (await fs.readdir(new URL('..', import.meta.url), { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(folder => folder.match(/^\d{4}-/))
      .sort((a, b) => -a.localeCompare(b))
      .map(async (folder) => {
        try {
          const md = await fs.readFile(new URL(`../${folder}/slides.md`, import.meta.url), 'utf-8');
          const title = md.match(/^title:\s*(.*)$/m)?.[1]?.trim() || '';
          return {
            title: title ? `${folder} | ${title}` : folder,
            value: folder,
          };
        }
        catch {
          return {
            title: folder,
            value: folder,
          };
        }
      }),
  );

  const result = args.includes('-y')
    ? { folder: folders[0]?.value }
    : await prompts([
      {
        type: 'select',
        name: 'folder',
        message: 'Selecione uma palestra',
        choices: folders,
      },
    ]);

  args = args.filter(arg => arg !== '-y');

  if (result.folder) {
    await execa('yarn', [...args], {
      cwd: new URL(`../${result.folder}`, import.meta.url),
      stdio: 'inherit',
    });
  }
}

await startPicker(process.argv.slice(2));
