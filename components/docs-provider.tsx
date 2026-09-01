'use client';

import { useMemo, type ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { DefaultSearchDialogProps } from 'fumadocs-ui/components/dialog/search-default';

import { DocsSearchDialog } from '@/components/docs-search-dialog';
import type { HelpSearchLink, HelpSearchPage, HelpSearchTagItem } from '@/lib/docs-search';

export function DocsProvider({
  children,
  links,
  tags,
  pages,
}: {
  children: ReactNode;
  links: HelpSearchLink[];
  tags: HelpSearchTagItem[];
  pages: HelpSearchPage[];
}) {
  const SearchDialog = useMemo(
    () =>
      function SearchDialog(props: DefaultSearchDialogProps) {
        return <DocsSearchDialog {...props} pages={pages} tags={tags} allowClear />;
      },
    [pages, tags]
  );

  return (
    <RootProvider
      search={{
        SearchDialog,
        links,
        options: { tags, allowClear: true },
      }}
    >
      {children}
    </RootProvider>
  );
}
