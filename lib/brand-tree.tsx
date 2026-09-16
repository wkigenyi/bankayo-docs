import type { ReactNode } from 'react';

import { BrandText } from '@/components/brand-name';
import { helpSource } from '@/lib/source';

type PageTreeRoot = typeof helpSource.pageTree;
type PageTreeNode = PageTreeRoot['children'][number];

function brandName(name: ReactNode): ReactNode {
  return typeof name === 'string' ? <BrandText>{name}</BrandText> : name;
}

function brandNode(node: PageTreeNode): PageTreeNode {
  if (node.type === 'separator') {
    return { ...node, name: node.name != null ? brandName(node.name) : node.name };
  }
  if (node.type === 'page') {
    return { ...node, name: brandName(node.name), description: brandName(node.description) };
  }
  return {
    ...node,
    name: brandName(node.name),
    description: brandName(node.description),
    index: node.index
      ? { ...node.index, name: brandName(node.index.name), description: brandName(node.index.description) }
      : node.index,
    children: node.children.map(brandNode),
  };
}

export function brandPageTree(tree: PageTreeRoot): PageTreeRoot {
  return {
    ...tree,
    name: brandName(tree.name),
    children: tree.children.map(brandNode),
  };
}
