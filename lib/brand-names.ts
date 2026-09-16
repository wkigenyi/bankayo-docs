/** Visible product names — always title case, never ordinary words. */
export const BRAND_RE =
  /\b((?:Apache\s+)?(?:Bankayo|Fineract))(['’]s)?\b/gi;

export function canonicalBrand(value: string): string {
  return value
    .replace(/apache/gi, 'Apache')
    .replace(/bankayo/gi, 'Bankayo')
    .replace(/fineract/gi, 'Fineract');
}

export function isUrlLike(value: string): boolean {
  return /https?:\/\//i.test(value) || /[\w.-]+\.(io|org|com)\b/i.test(value);
}

export type BrandPart = { type: 'text'; value: string } | { type: 'brand'; value: string };

export function splitBrandParts(text: string): BrandPart[] {
  const parts: BrandPart[] = [];
  const re = new RegExp(BRAND_RE.source, BRAND_RE.flags);
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: 'text', value: text.slice(last, match.index) });
    }
    parts.push({ type: 'brand', value: `${canonicalBrand(match[1])}${match[2] ?? ''}` });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts.length > 0 ? parts : [{ type: 'text', value: text }];
}
