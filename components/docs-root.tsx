import type { ReactNode } from 'react';

import { DocsProvider } from '@/components/docs-provider';
import { helpSearchTags } from '@/lib/docs-search';
import { helpSearchLinks, listHelpSearchPages } from '@/lib/docs-search-index';
import { helpSource } from '@/lib/source';

export function DocsRoot({ children }: { children: ReactNode }) {
  return (
    <DocsProvider
      links={helpSearchLinks(helpSource.pageTree)}
      pages={listHelpSearchPages()}
      tags={helpSearchTags()}
    >
      {children}
    </DocsProvider>
  );
}
