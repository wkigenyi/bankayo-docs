import { websiteJsonLd } from '@/lib/seo';

export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
    />
  );
}
