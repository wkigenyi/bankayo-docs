function trimSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

/** Public docs origin (canonical + sitemap). */
export function docsSiteUrl(): string {
  return trimSlash(process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3001');
}

/** Closed Bankayo UI — conversion CTA only, not a Fineract URL. */
export function appSiteUrl(): string {
  return trimSlash(process.env.NEXT_PUBLIC_APP_URL?.trim() || 'http://localhost:3000');
}
