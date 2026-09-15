import type { Metadata } from 'next';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { NotFoundContent } from '@/components/not-found-content';
import { docsCtaLinks, docsNav } from '@/lib/layout';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'This URL is not a Bankayo help page. Browse operator topics or search the Fineract help guides.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <HomeLayout nav={docsNav} links={docsCtaLinks()}>
      <NotFoundContent />
    </HomeLayout>
  );
}
