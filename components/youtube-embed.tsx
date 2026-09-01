'use client';

import { useState } from 'react';
import { PlayIcon } from 'lucide-react';

import {
  youtubeEmbedSrc,
  youtubePosterFallbackUrl,
  youtubePosterUrl,
} from '@/lib/youtube';

export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  const [poster, setPoster] = useState(() => youtubePosterUrl(id));

  return (
    <div className="bg-fd-muted relative aspect-video overflow-hidden rounded-xl border">
      {play ? (
        <iframe
          title={title}
          src={youtubeEmbedSrc(id, true)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => {
              const fallback = youtubePosterFallbackUrl(id);
              if (poster !== fallback) setPoster(fallback);
            }}
          />
          <span className="bg-fd-background/90 relative flex size-14 items-center justify-center rounded-full border">
            <PlayIcon className="size-6 translate-x-0.5" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}

export function YouTube({ id, title }: { id: string; title?: string }) {
  return <YouTubeEmbed id={id} title={title ?? 'Video'} />;
}
