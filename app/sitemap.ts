import type { MetadataRoute } from 'next';

import { docsSiteUrl } from '@/lib/site';
import { helpSource } from '@/lib/source';

function pagePriority(url: string): number {
  if (url === '/help' || url === '/help/fineract') return 0.9;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = docsSiteUrl();
  return [
    { url: origin, changeFrequency: 'weekly', priority: 1 },
    ...helpSource.getPages().map((page) => ({
      url: `${origin}${page.url}`,
      changeFrequency: 'weekly' as const,
      priority: pagePriority(page.url),
    })),
  ];
}
