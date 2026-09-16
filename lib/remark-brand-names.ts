import { isUrlLike, splitBrandParts } from '@/lib/brand-names';

type Node = {
  type: string;
  name?: string;
  value?: string;
  children?: Node[];
};

const SKIP = new Set(['code', 'inlineCode', 'definition', 'html', 'yaml', 'toml', 'heading']);

export function remarkBrandNames() {
  return (tree: Node) => walk(tree);
}

function walk(node: Node) {
  if (SKIP.has(node.type)) return;
  if (isBrandSpan(node)) return;
  const children = node.children;
  if (!children) return;
  const next: Node[] = [];
  for (const child of children) {
    if (child.type === 'text' && child.value && !isUrlLike(child.value)) {
      next.push(...toNodes(child.value));
    } else {
      walk(child);
      next.push(child);
    }
  }
  node.children = next;
}

function isBrandSpan(node: Node) {
  return node.type === 'mdxJsxTextElement' && node.name === 'span';
}

function toNodes(text: string): Node[] {
  return splitBrandParts(text).map((part) =>
    part.type === 'brand'
      ? {
          type: 'mdxJsxTextElement',
          name: 'span',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'className', value: 'brand-name' },
          ],
          children: [{ type: 'text', value: part.value }],
        }
      : { type: 'text', value: part.value },
  );
}
