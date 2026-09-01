function trimSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

/** Public docs origin (canonical + sitemap). */
export function docsSiteUrl(): string {
  return trimSlash(process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3001');
}

/** Marketing site — "Use Bankayo" CTA. Not the closed UI and not Fineract. */
export function wwwSiteUrl(): string {
  return trimSlash(process.env.NEXT_PUBLIC_WWW_URL?.trim() || 'https://www.bankayo.io');
}
