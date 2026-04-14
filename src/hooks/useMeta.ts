import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const SITE_NAME = 'MomentumLB';
const BASE_URL = 'https://momentumlb.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-cover.png`;

export function useMeta({ title, description, canonical, ogImage }: MetaOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) {
          el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] ?? '');
        } else {
          el.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] ?? '');
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical ?? `${BASE_URL}/`);
    setMeta('meta[property="og:image"]', 'content', ogImage ?? DEFAULT_OG_IMAGE);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?? (() => { const l = document.createElement('link'); l.rel = 'canonical'; document.head.appendChild(l); return l; })();
    canonicalEl.href = canonical ?? `${BASE_URL}/`;
  }, [title, description, canonical, ogImage]);
}
