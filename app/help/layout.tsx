import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

import { brandPageTree } from '@/lib/brand-tree';
import { docsCtaLinks, helpNav } from '@/lib/layout';
import { helpSource } from '@/lib/source';

export default function HelpLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={brandPageTree(helpSource.pageTree)} nav={helpNav} links={docsCtaLinks()}>
      {children}
    </DocsLayout>
  );
}
