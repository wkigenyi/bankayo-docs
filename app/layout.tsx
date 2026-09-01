import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Geist_Mono } from 'next/font/google';

import { DocsRoot } from '@/components/docs-root';
import { WebsiteJsonLd } from '@/components/website-json-ld';
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE } from '@/lib/seo';
import { docsSiteUrl } from '@/lib/site';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(docsSiteUrl()),
  title: {
    default: SITE_TITLE,
    template: '%s · Bankayo docs',
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  openGraph: {
    type: 'website',
    siteName: 'Bankayo docs',
    locale: 'en',
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${inter.className} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <WebsiteJsonLd />
        <DocsRoot>{children}</DocsRoot>
      </body>
    </html>
  );
}
