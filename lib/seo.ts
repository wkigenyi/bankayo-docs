import { docsSiteUrl } from '@/lib/site';

/** Visible in titles and meta — the queries we want to rank for, without pretending to be Apache. */
export const SITE_TITLE = 'Bankayo docs · Fineract customization and operator help';

export const SITE_DESCRIPTION =
  'Fineract help for operators: Bankayo customizes Apache Fineract — operator UI, backend around the core, integrations, and compliance checks — not only a new front end. Day-to-day screens, permissions, and tenant configuration without replacing the Apache API.';

export const SITE_KEYWORDS = [
  'Fineract help',
  'Fineract UI',
  'Fineract customization',
  'Apache Fineract',
  'Fineract documentation',
  'custom Fineract UI',
  'Bankayo',
  'core banking',
  'Fineract integrations',
  'Fineract compliance',
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
          'Apache Fineract customized for the institution: operator UI, backend around the core, integrations, and compliance checks. Operator help lives on this site.',
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
