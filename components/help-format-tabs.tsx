'use client';

import { useCallback, useState, useSyncExternalStore, type ReactNode } from 'react';
import { track } from '@vercel/analytics';
import { BookOpenIcon, PlayIcon } from 'lucide-react';
import { Tab, Tabs, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';

import { YouTubeEmbed } from '@/components/youtube-embed';

const VIDEO_REQUEST_PREFIX = 'help-video-request:';

export function HelpFormatTabs({
  children,
  youtubeId,
  path,
  title,
}: {
  children: ReactNode;
  youtubeId?: string;
  path: string;
  title: string;
}) {
  return (
    <Tabs
      defaultValue="read"
      groupId="help-format"
      persist
      className="my-6 overflow-visible rounded-none border-0 bg-transparent"
    >
      <TabsList className="px-0">
        <TabsTrigger value="read">
          <BookOpenIcon aria-hidden="true" />
          Read
        </TabsTrigger>
        <TabsTrigger value="watch">
          <PlayIcon aria-hidden="true" />
          Watch
          {youtubeId ? (
            <>
              <span className="bg-fd-primary size-1.5 rounded-full" aria-hidden="true" />
              <span className="sr-only">(video available)</span>
            </>
          ) : null}
        </TabsTrigger>
      </TabsList>
      <Tab value="read" forceMount className="p-0">
        {children}
      </Tab>
      <Tab value="watch" forceMount className="p-0 pt-4">
        {youtubeId ? (
          <div className="flex flex-col gap-3">
            <YouTubeEmbed id={youtubeId} title={title} />
            <p className="text-fd-muted-foreground text-sm">
              This walkthrough matches the written guide on this page.
            </p>
          </div>
        ) : (
          <HelpVideoRequest path={path} />
        )}
      </Tab>
    </Tabs>
  );
}

function readRequested(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function HelpVideoRequest({ path }: { path: string }) {
  const storageKey = `${VIDEO_REQUEST_PREFIX}${path}`;
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
  const stored = useSyncExternalStore(subscribe, () => readRequested(storageKey), () => false);
  const [justRequested, setJustRequested] = useState(false);
  const requested = stored || justRequested;

  function requestVideo() {
    if (requested) return;
    track('help_video_request', { path });
    try {
      window.localStorage.setItem(storageKey, '1');
    } catch {
      // still thank the visitor even if storage is blocked
    }
    setJustRequested(true);
  }

  return (
    <div className="border-fd-border bg-fd-secondary/40 rounded-xl border p-6">
      <p className="text-fd-foreground font-medium">No walkthrough on this page yet.</p>
      {requested ? (
        <p className="text-fd-muted-foreground mt-2 text-sm">
          Thanks — we recorded that you would like a video for this topic.
        </p>
      ) : (
        <>
          <p className="text-fd-muted-foreground mt-2 text-sm">
            Ask for a walkthrough of this page. We use the count to decide what to record next —
            no name or email.
          </p>
          <button
            type="button"
            onClick={requestVideo}
            className="bg-fd-primary text-fd-primary-foreground mt-4 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
          >
            I’d like a video
          </button>
        </>
      )}
    </div>
  );
}
