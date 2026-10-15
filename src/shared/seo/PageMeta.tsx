import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pagesData from '@/data/pages.json';

type PageInfo = { title: string; description: string };
const pages = pagesData.pages as Record<string, PageInfo>;

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
};

/**
 * Keeps <title>, description, canonical URL and Open Graph / Twitter tags in sync with the current page
 * (content in src/data/pages.json). Link previews on WhatsApp etc. use the per-page HTML written at build time.
 */
export default function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/';
    const page = pages[path] ?? pages['404'];
    const url = `${pagesData.siteUrl}${path === '/' ? '/' : path}`;

    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'robots', pages[path] ? 'index, follow' : 'noindex');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
}
