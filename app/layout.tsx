import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Geist_Mono } from 'next/font/google';

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
    default: 'Bankayo docs',
    template: '%s · Bankayo docs',
  },
  description:
    'Operator and feature documentation for Bankayo, custom banking on Apache Fineract.',
  openGraph: {
    type: 'website',
    siteName: 'Bankayo docs',
    locale: 'en',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
