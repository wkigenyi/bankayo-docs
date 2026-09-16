import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { BrandName, BrandText } from '@/components/brand-name';
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
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
        <p className="text-fd-muted-foreground mb-3 text-sm font-medium tracking-wide">
          <BrandName>Apache Fineract</BrandName>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-nowrap">
          <BrandName>Fineract</BrandName> help for the workspace you actually run
        </h1>
        <p className="text-fd-muted-foreground mt-4 text-lg">
          <BrandName>Bankayo</BrandName>{' '}
          <strong className="text-fd-foreground font-medium">
            customizes <BrandName>Apache Fineract</BrandName>
          </strong>{' '}
          for your institution: the operator UI, the backend around the core, integrations, and
          compliance — internal controls and the rules the bodies that regulate you require — not
          only a new front end. These pages are operator help: what the API persists, which
          permission you need, and where that work lives on screen.
        </p>
        <p className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/help/fineract"
            className="bg-fd-primary text-fd-primary-foreground inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
          >
            <BrandText>Fineract help, UI, and customization</BrandText>
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
            title={<BrandText>Fineract help</BrandText>}
            href="/help/fineract#fineract-help"
            description={
              <BrandText>
                Day-to-day Fineract resources — clients, loans, savings, journals, reports — with
                Bankayo’s screen map beside the API rules.
              </BrandText>
            }
          />
          <Card
            title={<BrandText>Fineract UI</BrandText>}
            href="/help/fineract#fineract-ui"
            description={
              <BrandText>
                The operator workspace — one part of the customization. How Bankayo talks to the
                tenant, and how this site differs from Apache’s platform docs.
              </BrandText>
            }
          />
          <Card
            title={<BrandText>Fineract customization</BrandText>}
            href="/help/fineract#fineract-customization"
            description={
              <BrandText>
                UI, backend, integrations, and compliance (internal controls and your regulators),
                plus tenant-level products, data tables, and configuration. Not a fork of Fineract
                itself.
              </BrandText>
            }
          />
        </Cards>

        <p className="text-fd-muted-foreground mt-10 text-sm">
          Platform and REST reference stays with{' '}
          <a href="https://fineract.apache.org/" className="underline underline-offset-4">
            <BrandName>Apache Fineract</BrandName>
          </a>
          .{' '}
          <BrandText>
            Apache Fineract is a trademark of the Apache Software Foundation. Bankayo is not an
            Apache project.
          </BrandText>
        </p>
      </div>
    </HomeLayout>
  );
}
