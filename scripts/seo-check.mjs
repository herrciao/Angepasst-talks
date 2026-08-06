import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');
const siteOrigin = 'https://angepasstlab.com';

if (!existsSync(dist)) {
  console.error('SEO check requires dist/. Run npm run build first.');
  process.exit(2);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function routeFor(file) {
  const path = relative(dist, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  return `/${path.replace(/\/index\.html$/, '')}`;
}

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? '';
}

function pageBase(route) {
  return new URL(route === '/' ? '/' : `${route.replace(/\/$/, '')}/`, siteOrigin);
}

function internalTargetExists(href, route = '/') {
  let pathname;
  try {
    const url = new URL(href, pageBase(route));
    if (url.origin !== siteOrigin) return true;
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return true;
  }
  if (pathname === '/') return existsSync(join(dist, 'index.html'));
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return existsSync(join(dist, clean, 'index.html')) || existsSync(join(dist, clean));
}

const files = walk(dist);
const htmlFiles = files.filter((file) => {
  if (!file.endsWith('.html')) return false;

  const path = relative(dist, file).split(sep).join('/');
  const isGoogleVerificationFile = !path.includes('/') && /^google[a-z0-9]+\.html$/i.test(path);
  return !isGoogleVerificationFile;
});
const issues = [];
const inbound = new Map(htmlFiles.map((file) => [routeFor(file), 0]));

for (const file of htmlFiles) {
  const route = routeFor(file);
  const html = readFileSync(file, 'utf8');
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = firstMatch(html, /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
    || firstMatch(html, /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const canonical = firstMatch(html, /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    || firstMatch(html, /<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) issues.push({ severity: 'error', route, check: 'title', detail: 'Missing title.' });
  if (!description) issues.push({ severity: 'warning', route, check: 'description', detail: 'Missing meta description.' });
  if (!canonical) issues.push({ severity: 'error', route, check: 'canonical', detail: 'Missing canonical URL.' });
  if (h1Count !== 1) issues.push({ severity: 'warning', route, check: 'h1', detail: `Expected 1 H1, found ${h1Count}.` });

  for (const match of html.matchAll(/<a\s+[^>]*href=["']([^"'#?]+)[^"']*["']/gi)) {
    const href = match[1];
    if (!internalTargetExists(href, route)) {
      issues.push({ severity: 'error', route, check: 'internal-link', detail: `Broken target: ${href}` });
      continue;
    }
    try {
      const url = new URL(href, pageBase(route));
      if (url.origin === siteOrigin) {
        const normalized = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
        if (inbound.has(normalized)) inbound.set(normalized, inbound.get(normalized) + 1);
      }
    } catch {}
  }

  for (const match of html.matchAll(/<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/gi)) {
    const image = match[1];
    if (!internalTargetExists(image, route)) issues.push({ severity: 'warning', route, check: 'og-image', detail: `Missing local image: ${image}` });
  }
}

for (const [route, count] of inbound) {
  if (route.startsWith('/posts/') && count === 0) {
    issues.push({ severity: 'warning', route, check: 'orphan-page', detail: 'No internal HTML links found to this post.' });
  }
}

const sitemap = join(dist, 'sitemap-index.xml');
if (!existsSync(sitemap)) issues.push({ severity: 'error', route: '/', check: 'sitemap', detail: 'Missing sitemap-index.xml.' });

const robots = join(dist, 'robots.txt');
if (!existsSync(robots)) issues.push({ severity: 'error', route: '/', check: 'robots', detail: 'Missing robots.txt.' });

const errors = issues.filter((item) => item.severity === 'error');
const warnings = issues.filter((item) => item.severity === 'warning');

console.log(`SEO check: ${htmlFiles.length} HTML pages, ${errors.length} errors, ${warnings.length} warnings.`);
const grouped = new Map();
for (const item of issues) {
  const key = `${item.severity}\u0000${item.check}\u0000${item.detail}`;
  const group = grouped.get(key) ?? { ...item, routes: [] };
  group.routes.push(item.route);
  grouped.set(key, group);
}
for (const item of grouped.values()) {
  const shown = item.routes.slice(0, 8).join(', ');
  const remaining = item.routes.length > 8 ? `, +${item.routes.length - 8} more` : '';
  console.log(`[${item.severity.toUpperCase()}] ${item.check} (${item.routes.length} page${item.routes.length === 1 ? '' : 's'}): ${item.detail} Routes: ${shown}${remaining}`);
}

process.exit(errors.length > 0 ? 1 : 0);
