import { NextResponse, type NextRequest } from 'next/server';
import { createFromSource } from 'fumadocs-core/search/server';

import { helpSearchTag } from '@/lib/docs-search';
import { helpSource } from '@/lib/source';

const { GET: searchGET } = createFromSource(helpSource, {
  buildIndex(page) {
    return {
      id: page.url,
      url: page.url,
      title: page.data.title ?? 'Help',
      description: page.data.description,
      structuredData: page.data.structuredData ?? { headings: [], contents: [] },
      tag: helpSearchTag(page.url),
    };
  },
});

export async function GET(request: NextRequest) {
  return searchGET(request);
}
