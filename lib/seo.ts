import { docsSiteUrl } from '@/lib/site';

/** Visible in titles and meta — the queries we want to rank for, without pretending to be Apache. */
export const SITE_TITLE = 'Bankayo docs · Fineract UI and operator help';

export const SITE_DESCRIPTION =
  'Fineract help for operators: Bankayo is a custom Fineract UI on Apache Fineract. Day-to-day screens, permissions, and how institutions customize Fineract — products, data tables, and configuration — without replacing the Apache API.';

export const SITE_KEYWORDS = [
  'Fineract help',
  'Fineract UI',
  'Fineract customization',
  'Apache Fineract',
  'Fineract documentation',
  'custom Fineract UI',
  'Bankayo',
  'core banking',
];

export function websiteJsonLd() {
  const url = docsSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Bankayo docs',
        alternateName: ['Fineract UI docs', 'Fineract help', 'Bankayo Fineract documentation'],
        url,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Bankayo',
        applicationCategory: 'FinanceApplication',
        description:
          'A custom user interface for Apache Fineract. Operator help for Fineract resources lives on this site.',
        url,
        isBasedOn: {
          '@type': 'SoftwareApplication',
          name: 'Apache Fineract',
          url: 'https://fineract.apache.org/',
        },
      },
    ],
  };
}
