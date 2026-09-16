import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { BrandName } from '@/components/brand-name';
import { YouTube } from '@/components/youtube-embed';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    BrandName,
    YouTube,
    ...components,
  };
}
