import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { docsCtaLinks, docsNav } from '@/lib/layout';
import { helpSource } from '@/lib/source';

export default function HelpLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={helpSource.pageTree} nav={docsNav} links={docsCtaLinks()}>
      {children}
    </DocsLayout>
  );
}
