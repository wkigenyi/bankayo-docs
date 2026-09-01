export const HELP_SEARCH_TAG = {
  workspace: 'workspace',
  products: 'products',
  accounting: 'accounting',
  organization: 'organization',
} as const;

export type HelpSearchTag = (typeof HELP_SEARCH_TAG)[keyof typeof HELP_SEARCH_TAG];

export type HelpSearchPage = {
  title: string;
  url: string;
  tag: HelpSearchTag;
};

export type HelpSearchLink = [name: string, href: string];

export type HelpSearchTagItem = {
  name: string;
  value: HelpSearchTag;
};

export function helpSearchTag(url: string): HelpSearchTag {
  const first = url.replace(/^\/help\/?/, '').split('/')[0];
  if (first === HELP_SEARCH_TAG.products) return HELP_SEARCH_TAG.products;
  if (first === HELP_SEARCH_TAG.accounting) return HELP_SEARCH_TAG.accounting;
  if (first === HELP_SEARCH_TAG.organization) return HELP_SEARCH_TAG.organization;
  return HELP_SEARCH_TAG.workspace;
}

export function helpSearchTags(): HelpSearchTagItem[] {
  return [
    { name: 'Guides', value: HELP_SEARCH_TAG.workspace },
    { name: 'Products', value: HELP_SEARCH_TAG.products },
    { name: 'Accounting', value: HELP_SEARCH_TAG.accounting },
    { name: 'Organization', value: HELP_SEARCH_TAG.organization },
  ];
}
