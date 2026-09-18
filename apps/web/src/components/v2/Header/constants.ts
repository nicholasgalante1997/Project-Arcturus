import { ExternalLinksConfig } from '@arcjr/config';

import copy from '@/content/en.json';

export enum ARCJR_V2_TABS {
  HOME = '/',
  POSTS = '/post',
  RFCS = '/rfc',
  ABOUT = '/about',
  CONTACT = '/contact'
}

export function getActiveTabByPathname(tab: string) {
  if (typeof window === 'undefined') return 'default' as const;

  const pathname = new URL(window.location.href).pathname;
  if (tab === '/') return pathname === '/' ? ('active' as const) : ('default' as const);

  return pathname.startsWith(tab) ? ('active' as const) : ('default' as const);
}

export const NAVIGATION_ITEMS = [
  { href: '/', activeTab: ARCJR_V2_TABS.HOME, label: copy.site.navigation.home },
  { href: '/posts', activeTab: ARCJR_V2_TABS.POSTS, label: copy.site.navigation.posts },
  { href: '/rfcs', activeTab: ARCJR_V2_TABS.RFCS, label: copy.site.navigation.rfcs },
  { href: '/about', activeTab: ARCJR_V2_TABS.ABOUT, label: copy.site.navigation.about },
  { href: '/contact', activeTab: ARCJR_V2_TABS.CONTACT, label: copy.site.navigation.contact }
] as const;

export const GITHUB_HREF = ExternalLinksConfig.ExternalLinkGithub;
export const LINKEDIN_HREF = ExternalLinksConfig.ExternalLinkLinkedIn;
export const SHOW_IMAGE_LOGO = false;
