'use client';

import { useCallback, useState, useSyncExternalStore, type ReactNode } from 'react';
import { track } from '@vercel/analytics';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

const VOTE_PREFIX = 'help-article-helpful:';

type Vote = 'yes' | 'no';

function readVote(key: string): Vote | null {
  try {
    const value = window.localStorage.getItem(key);
    return value === 'yes' || value === 'no' ? value : null;
  } catch {
    return null;
  }
}

export function HelpArticleFeedback({ path }: { path: string }) {
  const storageKey = `${VOTE_PREFIX}${path}`;
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const onStorage = (event: StorageEvent) => {
        if (event.key === storageKey || event.key === null) onStoreChange();
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    },
    [storageKey],
  );
  const stored = useSyncExternalStore(subscribe, () => readVote(storageKey), () => null);
  const [justVoted, setJustVoted] = useState<Vote | null>(null);
  const voted = stored ?? justVoted;

  function vote(next: Vote) {
    if (voted) return;
    track('help_article_helpful', { path, helpful: next === 'yes' });
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // still thank the visitor even if storage is blocked
    }
    setJustVoted(next);
  }

  return (
    <div className="border-fd-border not-prose mt-10 border-t py-6">
      <p id="help-article-feedback" className="text-fd-foreground text-sm font-medium">
        Was this article helpful?
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-labelledby="help-article-feedback">
        <VoteButton pressed={voted === 'yes'} disabled={Boolean(voted)} onClick={() => vote('yes')}>
          <ThumbsUpIcon aria-hidden="true" />
          Yes
        </VoteButton>
        <VoteButton pressed={voted === 'no'} disabled={Boolean(voted)} onClick={() => vote('no')}>
          <ThumbsDownIcon aria-hidden="true" />
          No
        </VoteButton>
      </div>
      {voted ? (
        <p className="text-fd-muted-foreground mt-3 text-sm">
          Thanks — your feedback helps us improve this page.
        </p>
      ) : (
        <p className="text-fd-muted-foreground mt-3 text-sm">
          Yes or no only — no name or email.
        </p>
      )}
    </div>
  );
}

function VoteButton({
  pressed,
  disabled,
  onClick,
  children,
}: {
  pressed: boolean;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium [&_svg]:size-4',
        'focus-visible:ring-fd-ring focus-visible:ring-2 focus-visible:outline-none',
        pressed
          ? 'bg-fd-accent text-fd-accent-foreground [&_svg]:fill-current'
          : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
        disabled && !pressed && 'opacity-50',
        disabled && 'pointer-events-none',
      )}
    >
      {children}
    </button>
  );
}
