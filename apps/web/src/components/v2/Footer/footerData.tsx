import copy from '@/content/en.json';

import { GitHubIcon, LinkedInIcon } from './components/FooterIcons';

import type { FooterSection, SocialLink } from './types';

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: copy.site.footer.navigationTitle,
    links: [
      { label: copy.site.navigation.home, href: '/' },
      { label: copy.site.navigation.posts, href: '/posts' },
      { label: copy.site.navigation.rfcs, href: '/rfcs' },
      { label: copy.site.navigation.about, href: '/about' },
      { label: copy.site.navigation.contact, href: '/contact' }
    ]
  },
  {
    title: copy.site.footer.resourcesTitle,
    links: [
      {
        label: copy.site.social.github,
        href: 'https://github.com/nicholasgalante1997/Arcturus-JR',
        external: true
      },
      { label: copy.site.footer.bunDocumentation, href: 'https://bun.sh', external: true },
      { label: copy.site.footer.reactDocumentation, href: 'https://react.dev', external: true }
    ]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: copy.site.social.github,
    href: 'https://github.com/nicholasgalante1997',
    icon: <GitHubIcon />,
    ariaLabel: copy.site.social.githubProfileLabel
  },
  {
    name: copy.site.social.linkedin,
    href: 'https://www.linkedin.com/in/nicholas-g-1963041a2/',
    icon: <LinkedInIcon />,
    ariaLabel: copy.site.social.linkedinProfileLabel
  }
];
