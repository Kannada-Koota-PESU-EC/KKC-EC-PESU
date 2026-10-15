// Runs after `vite build`. Writes a copy of dist/index.html for every page in src/data/pages.json
// (dist/events.html and dist/events/index.html, …) with that page's <title>, description, canonical URL and
// Open Graph / Twitter tags, so link previews (WhatsApp, Instagram, LinkedIn) show the right page.
// Also writes dist/404.html for hosts that serve it for unknown URLs.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { siteUrl, shareImage, pages } = JSON.parse(readFileSync(join(root, 'src/data/pages.json'), 'utf8'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const setTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`prerender-meta: tag not found in index.html: ${pattern}`);
  return html.replace(pattern, replacement);
};

const render = (page, url, indexable) => {
  const title = escape(page.title);
  const description = escape(page.description);
  let html = template;
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`);
  html = setTag(html, /<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${indexable ? 'index, follow' : 'noindex'}" />`);
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`);
  html = setTag(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  html = setTag(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${siteUrl}${shareImage}" />`);
  html = setTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`);
  html = setTag(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`);
  html = setTag(html, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${siteUrl}${shareImage}" />`);
  return html;
};

for (const [path, page] of Object.entries(pages)) {
  if (path === '404') {
    writeFileSync(join(dist, '404.html'), render(page, `${siteUrl}/404`, false));
    continue;
  }
  const html = render(page, `${siteUrl}${path === '/' ? '/' : path}`, true);
  if (path === '/') {
    writeFileSync(join(dist, 'index.html'), html);
    continue;
  }
  // Both /events.html and /events/index.html, so "/events" works on every host
  // (Netlify/Cloudflare pretty URLs, Vercel with cleanUrls, plain static servers)
  const name = path.slice(1);
  writeFileSync(join(dist, `${name}.html`), html);
  mkdirSync(join(dist, name), { recursive: true });
  writeFileSync(join(dist, name, 'index.html'), html);
}

console.log(`prerender-meta: wrote meta tags for ${Object.keys(pages).length} pages`);
