import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const HELP_ROOT = path.join(process.cwd(), 'content', 'help');

function walkMdx(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMdx(full, out);
    else if (entry.name.endsWith('.mdx')) out.push(full);
  }
  return out;
}

function slugForFile(file) {
  const rel = path.relative(HELP_ROOT, file).replace(/\\/g, '/');
  if (rel === 'index.mdx') return '/help';
  if (rel.endsWith('/index.mdx')) return `/help/${rel.slice(0, -'/index.mdx'.length)}`;
  return `/help/${rel.slice(0, -'.mdx'.length)}`;
}

const files = walkMdx(HELP_ROOT);
if (files.length === 0) {
  console.error('No MDX under content/help');
  process.exit(1);
}

const invalid = [];
for (const file of files) {
  const slug = slugForFile(file);
  const raw = readFileSync(file, 'utf8');
  if (!raw.startsWith('---')) invalid.push(`${slug} (no frontmatter)`);
}

if (invalid.length) {
  console.error('Invalid help pages:\n', invalid.join('\n'));
  process.exit(1);
}

console.log(`OK ${files.length} MDX pages under content/help`);
