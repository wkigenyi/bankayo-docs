import { BrandText } from '@/components/brand-name';
import { Logo } from '@/components/logo';
import { wwwSiteUrl } from '@/lib/site';

export const docsNav = {
  title: <Logo size="sm" />,
  url: '/',
};

export const helpNav = {
  ...docsNav,
  mode: 'top' as const,
};

export function docsCtaLinks() {
  return [
    {
      type: 'button' as const,
      text: <BrandText>Use Bankayo</BrandText>,
      url: wwwSiteUrl(),
      external: true,
    },
  ];
}
