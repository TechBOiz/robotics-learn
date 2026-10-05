// Checks every internal link and asset reference in the built site (dist/).
// Run after `npm run build`. Exits non-zero if anything points nowhere.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.BASE_PATH ?? '/everything-robotics').replace(/\/$/, '');

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});

const pages = walk(dist).filter((p) => p.endsWith('.html'));
const problems = [];
let checked = 0;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    checked++;
    const [path, hash] = url.split('#');
    if (!path) {
      if (hash && !ids.has(hash)) problems.push(`${page}: missing anchor #${hash}`);
      continue;
    }
    if (path.startsWith('/') && !path.startsWith(base + '/') && path !== base) {
      problems.push(`${page}: ${url} is missing the base path ${base}`);
      continue;
    }
    const target = path.startsWith('/') ? join(dist, path.slice(base.length)) : join(dirname(page), path);
    const file = existsSync(target) && statSync(target).isDirectory() ? join(target, 'index.html') : target;
    if (!existsSync(file)) { problems.push(`${page}: ${url} does not exist`); continue; }
    if (hash && file.endsWith('.html') && !new RegExp(`\\sid="${hash}"`).test(readFileSync(file, 'utf8'))) {
      problems.push(`${page}: ${url} anchor not found`);
    }
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} broken link(s) across ${pages.length} pages.`);
  process.exit(1);
}
console.log(`OK — ${checked} internal links across ${pages.length} pages.`);
