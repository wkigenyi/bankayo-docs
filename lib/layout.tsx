import { Logo } from '@/components/logo';
import { wwwSiteUrl } from '@/lib/site';

export const docsNav = {
  title: <Logo size="sm" />,
  url: '/',
};

export function docsCtaLinks() {
  return [
    {
      type: 'button' as const,
      text: 'Use Bankayo',
      url: wwwSiteUrl(),
      external: true,
    },
  ];
}
