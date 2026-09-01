import { appSiteUrl } from '@/lib/site';

export const docsNav = {
  title: 'Bankayo docs',
};

export function docsCtaLinks() {
  return [
    {
      type: 'button' as const,
      text: 'Use Bankayo',
      url: appSiteUrl(),
      external: true,
    },
  ];
}
