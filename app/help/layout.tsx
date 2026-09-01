import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { DocsProvider } from '@/components/docs-provider';
import { helpSearchTags } from '@/lib/docs-search';
import { helpSearchLinks, listHelpSearchPages } from '@/lib/docs-search-index';
import { appSiteUrl } from '@/lib/site';
import { helpSource } from '@/lib/source';

export default function HelpLayout({ children }: { children: ReactNode }) {
  return (
    <DocsProvider
      links={helpSearchLinks(helpSource.pageTree)}
      pages={listHelpSearchPages()}
      tags={helpSearchTags()}
    >
      <DocsLayout
        tree={helpSource.pageTree}
        nav={{ title: 'Bankayo docs' }}
        links={[
          {
            type: 'button',
            text: 'Use Bankayo',
            url: appSiteUrl(),
            external: true,
          },
        ]}
      >
        {children}
      </DocsLayout>
    </DocsProvider>
  );
}
