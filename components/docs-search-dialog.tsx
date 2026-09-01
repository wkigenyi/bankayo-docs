'use client';

import { useMemo, useState } from 'react';
import { FileTextIcon } from 'lucide-react';
import { fetchClient } from 'fumadocs-core/search/client/fetch';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import type { DefaultSearchDialogProps } from 'fumadocs-ui/components/dialog/search-default';
import { useI18n } from 'fumadocs-ui/contexts/i18n';

import { helpSearchTag, type HelpSearchPage } from '@/lib/docs-search';

export type DocsSearchDialogProps = DefaultSearchDialogProps & {
  pages?: HelpSearchPage[];
};

export function DocsSearchDialog({
  links = [],
  tags = [],
  pages = [],
  defaultTag,
  allowClear = true,
  api,
  delayMs = 100,
  ...props
}: DocsSearchDialogProps) {
  const { locale } = useI18n();
  const [tag, setTag] = useState(defaultTag);
  const { search, setSearch, query } = useDocsSearch({
    client: fetchClient({ api, locale, tag }),
    delayMs,
  });

  const browseItems = useMemo(() => {
    if (tag && pages.length > 0) {
      return pages
        .filter((page) => page.tag === tag)
        .map((page) => ({
          type: 'page' as const,
          id: page.url,
          content: page.title,
          url: page.url,
        }));
    }
    return links
      .filter(([, href]) => !tag || helpSearchTag(href) === tag)
      .map(([name, href]) => ({
        type: 'page' as const,
        id: href,
        content: name,
        url: href,
      }));
  }, [links, pages, tag]);

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        {tags.length > 0 ? (
          <div className="flex items-center px-3 pt-3">
            <TagsList tag={tag} onTagChange={setTag} allowClear={allowClear}>
              {tags.map((item) => (
                <TagsListItem key={item.value} value={item.value}>
                  {item.name}
                </TagsListItem>
              ))}
            </TagsList>
          </div>
        ) : null}
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          items={query.data !== 'empty' ? query.data : browseItems}
          Item={({ item, onClick }) =>
            query.data === 'empty' && item.type === 'page' ? (
              <SearchDialogListItem
                item={item}
                onClick={onClick}
                className="flex items-center gap-2"
              >
                <FileTextIcon className="size-4 shrink-0 text-fd-muted-foreground" />
                <span className="min-w-0 flex-1 truncate">{item.content}</span>
              </SearchDialogListItem>
            ) : (
              <SearchDialogListItem item={item} onClick={onClick} />
            )
          }
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}
