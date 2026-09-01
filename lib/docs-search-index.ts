import type * as PageTree from 'fumadocs-core/page-tree';

import {
  helpSearchTag,
  type HelpSearchLink,
  type HelpSearchPage,
} from '@/lib/docs-search';
import { helpSource } from '@/lib/source';

function nodeName(value: PageTree.Node['name'] | PageTree.Root['name']): string | null {
  if (typeof value !== 'string') return null;
  const title = value.trim();
  return title.length > 0 ? title : null;
}

export function helpSearchLinks(tree: PageTree.Root = helpSource.pageTree): HelpSearchLink[] {
  const links: HelpSearchLink[] = [];
  for (const node of tree.children) {
    if (node.type === 'page') {
      const name = nodeName(node.name);
      if (name) links.push([name, node.url]);
      continue;
    }
    if (node.type !== 'folder') continue;
    const name = nodeName(node.name);
    const href =
      node.index?.url ??
      node.children.find((child): child is PageTree.Item => child.type === 'page')?.url;
    if (name && href) links.push([name, href]);
  }
  return links;
}

export function listHelpSearchPages(): HelpSearchPage[] {
  const pages: HelpSearchPage[] = [];
  for (const page of helpSource.getPages()) {
    const title = page.data.title?.trim();
    if (!title) continue;
    pages.push({ title, url: page.url, tag: helpSearchTag(page.url) });
  }
  return pages;
}
