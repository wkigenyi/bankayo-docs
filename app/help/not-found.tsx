import type { Metadata } from 'next';
import { DocsPage } from 'fumadocs-ui/layouts/notebook/page';

import { NotFoundContent } from '@/components/not-found-content';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'This URL is not a Bankayo help page. Browse operator topics or search the Fineract help guides.',
  robots: { index: false, follow: true },
};

export default function HelpNotFound() {
  return (
    <DocsPage
      full
      breadcrumb={{ enabled: false }}
      footer={{ enabled: false }}
      tableOfContent={{ enabled: false }}
      tableOfContentPopover={{ enabled: false }}
    >
      <NotFoundContent inset />
    </DocsPage>
  );
}
