import type { MetadataRoute } from 'next';

import { docsSiteUrl } from '@/lib/site';
import { helpSource } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = docsSiteUrl();
  return helpSource.getPages().map((page) => ({
    url: `${origin}${page.url}`,
    changeFrequency: 'weekly',
    priority: page.url === '/help' ? 1 : 0.7,
  }));
}
