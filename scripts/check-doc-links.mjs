import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(location)));
    else if (entry.name.endsWith('.md')) files.push(location);
  }
  return files;
}

function headingAnchors(markdown) {
  const counts = new Map();
  const anchors = new Set();
  const prose = markdown.replace(/^```[^\n]*\n[\s\S]*?^```/gm, '');
  for (const heading of prose.matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)) {
    const slug = heading[1]
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[^\p{L}\p{N}_\-\s]/gu, '')
      .replace(/\s/g, '-');
    const count = counts.get(slug) ?? 0;
    counts.set(slug, count + 1);
    anchors.add(count ? `${slug}-${count}` : slug);
  }
  return anchors;
}

const files = [
  path.join(root, 'README.md'),
  path.join(root, 'AGENTS.md'),
  ...(await markdownFiles(path.join(root, 'docs'))),
];
const failures = [];
let checked = 0;
for (const file of files) {
  const markdown = (await readFile(file, 'utf8')).replace(/^```[^\n]*\n[\s\S]*?^```/gm, '');
  for (const match of markdown.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
    const href = match[1].replace(/^<|>$/g, '');
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;
    checked++;
    const [relative, fragment] = href.split('#');
    const target = path.resolve(
      path.dirname(file),
      decodeURIComponent(relative || path.basename(file)),
    );
    try {
      const info = await stat(target);
      if (!info.isFile()) throw new Error('target is not a file');
      if (fragment && target.endsWith('.md')) {
        const anchors = headingAnchors(await readFile(target, 'utf8'));
        if (!anchors.has(decodeURIComponent(fragment)))
          throw new Error('heading anchor is missing');
      }
    } catch (error) {
      failures.push(`${path.relative(root, file)}: ${href} (${error.message})`);
    }
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${checked} relative links across ${files.length} Markdown files.`);
}
