import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { docsCtaLinks, docsNav } from '@/lib/layout';
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE } from '@/lib/seo';
import { docsSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: docsSiteUrl() },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: docsSiteUrl(),
    type: 'website',
  },
};

export default function Home() {
  return (
    <HomeLayout nav={docsNav} links={docsCtaLinks()}>
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24">
        <p className="text-fd-muted-foreground mb-3 text-sm font-medium tracking-wide uppercase">
          Apache Fineract
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Fineract help for the UI you actually run
        </h1>
        <p className="text-fd-muted-foreground mt-4 text-lg">
          Bankayo is a <strong className="text-fd-foreground font-medium">custom Fineract UI</strong>{' '}
          on Apache Fineract. These pages are operator help: what the API persists, which
          permission you need, and where that work lives on screen.
        </p>
        <p className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/help/fineract"
            className="bg-fd-primary text-fd-primary-foreground inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
          >
            Fineract help, UI, and customization
          </Link>
          <Link
            href="/help"
            className="border-fd-border inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
          >
            Browse all topics
          </Link>
        </p>

        <Cards className="mt-12 lg:grid-cols-3">
          <Card
            title="Fineract help"
            href="/help/fineract#fineract-help"
            description="Day-to-day Fineract resources — clients, loans, savings, journals, reports — with Bankayo’s screen map beside the API rules."
          />
          <Card
            title="Fineract UI"
            href="/help/fineract#fineract-ui"
            description="What a Fineract UI is, how Bankayo talks to the tenant, and how this site differs from Apache’s own platform docs."
          />
          <Card
            title="Fineract customization"
            href="/help/fineract#fineract-customization"
            description="Tenant-level change: products, data tables, configurations, roles. Not a fork of Fineract itself."
          />
        </Cards>

        <p className="text-fd-muted-foreground mt-10 text-sm">
          Platform and REST reference stays with{' '}
          <a href="https://fineract.apache.org/" className="underline underline-offset-4">
            Apache Fineract
          </a>
          . Apache Fineract is a trademark of the Apache Software Foundation. Bankayo is not an
          Apache project.
        </p>
      </div>
    </HomeLayout>
  );
}
