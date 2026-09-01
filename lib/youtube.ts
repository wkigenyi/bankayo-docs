const YOUTUBE_ID = /^[a-zA-Z0-9_-]{11}$/;

export function isYouTubeId(value: unknown): value is string {
  return typeof value === 'string' && YOUTUBE_ID.test(value);
}

export function youtubeEmbedSrc(id: string, autoplay = false) {
  const params = new URLSearchParams({ rel: '0', modestbranding: '1' });
  if (autoplay) params.set('autoplay', '1');
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function youtubePosterUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export function youtubePosterFallbackUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
