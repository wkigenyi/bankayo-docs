import type { ReactNode } from 'react';

import { canonicalBrand, splitBrandParts } from '@/lib/brand-names';

function childText(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(childText).join('');
  }
  return '';
}

export function BrandName({ children }: { children: ReactNode }) {
  return <span className="brand-name">{canonicalBrand(childText(children))}</span>;
}

export function BrandText({ children }: { children?: ReactNode }) {
  const text = childText(children);
  if (!text) return null;
  return (
    <>
      {splitBrandParts(text).map((part, index) =>
        part.type === 'brand' ? (
          <BrandName key={index}>{part.value}</BrandName>
        ) : (
          part.value
        ),
      )}
    </>
  );
}
