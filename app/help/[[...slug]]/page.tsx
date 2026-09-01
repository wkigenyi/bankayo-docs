import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';

import { HelpArticleFeedback } from '@/components/help-article-feedback';
import { HelpFormatTabs } from '@/components/help-format-tabs';
import { isYouTubeId } from '@/lib/youtube';
import { helpSource } from '@/lib/source';
import { SITE_KEYWORDS } from '@/lib/seo';
import { docsSiteUrl } from '@/lib/site';
import { getMDXComponents } from '@/mdx-components';

export function generateStaticParams() {
  return helpSource.generateParams();
}

export const dynamicParams = false;

type HelpPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function HelpPage(props: HelpPageProps) {
  const params = await props.params;
  const page = helpSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const youtubeId = isYouTubeId(page.data.youtubeId) ? page.data.youtubeId : undefined;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <HelpFormatTabs youtubeId={youtubeId} path={page.url} title={page.data.title}>
        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>
      </HelpFormatTabs>
      <HelpArticleFeedback path={page.url} />
    </DocsPage>
  );
}

export async function generateMetadata(props: HelpPageProps) {
  const params = await props.params;
  const page = helpSource.getPage(params.slug);
  if (!page) notFound();
  const url = `${docsSiteUrl()}${page.url}`;
  const discovery =
    page.url === '/help' || page.url === '/help/fineract'
      ? { keywords: SITE_KEYWORDS }
      : {};
  return {
    title: page.data.title,
    description: page.data.description,
    ...discovery,
    alternates: { canonical: url },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url,
      type: 'article',
    },
  };
}
