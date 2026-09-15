'use client';

/* Hard navigation: Next.js Link does not leave the not-found state. */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useSearchContext } from 'fumadocs-ui/contexts/search';

import { cn } from '@/lib/cn';

const DESTINATIONS = [
  {
    title: 'Fineract help, UI, and customization',
    href: '/help/fineract',
    description:
      'What this site covers — operator UI, the backend around the core, integrations, and compliance — and how it differs from Apache’s platform docs.',
  },
  {
    title: 'Signing in',
    href: '/help/signing-in',
    description:
      'Add a Fineract server, sign in, two-factor authentication, session behavior, and troubleshooting.',
  },
  {
    title: 'Finding your way around',
    href: '/help/navigation',
    description:
      'The sidebar, quick-jump search, notifications, and the top bar in the operator workspace.',
  },
] as const;

export function NotFoundContent({ inset = false }: { inset?: boolean }) {
  return (
    <div className={cn(inset ? 'py-6' : 'mx-auto w-full max-w-5xl px-4 py-16 sm:py-24')}>
      <p className="text-fd-muted-foreground mb-3 text-sm font-medium tracking-wide uppercase">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        This page isn’t in Bankayo help
      </h1>
      <p className="text-fd-muted-foreground mt-4 max-w-2xl text-lg">
        That address is not a help page. It may have been renamed, or the{' '}
        <strong className="text-fd-foreground font-medium">?</strong> button in Bankayo may
        point at a topic we have not published yet.
      </p>
      <p className="mt-6 flex flex-wrap gap-3">
        <a
          href="/help"
          className="bg-fd-primary text-fd-primary-foreground inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
        >
          Browse all topics
        </a>
        <a
          href="/"
          className="border-fd-border inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
        >
          Home
        </a>
        <SearchHelpButton />
      </p>

      <div className="@container mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {DESTINATIONS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="bg-fd-card text-fd-card-foreground hover:bg-fd-accent/80 @max-lg:col-span-full block rounded-xl border p-4 transition-colors"
          >
            <h2 className="mb-1 text-sm font-medium">{item.title}</h2>
            <p className="text-fd-muted-foreground text-sm">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function SearchHelpButton() {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="border-fd-border inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
    >
      Search help
      <span className="text-fd-muted-foreground inline-flex gap-0.5 text-xs font-normal">
        {hotKey.map((key, index) => (
          <kbd key={index} className="border-fd-border rounded border px-1.5">
            {key.display}
          </kbd>
        ))}
      </span>
    </button>
  );
}
