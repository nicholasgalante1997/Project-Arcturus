import { Link } from 'react-router';

import copy from '@/content/en.json';

import { GITHUB_HREF, LINKEDIN_HREF } from '../constants';

import { GitHubIcon, LinkedInIcon } from './HeaderIcons';

interface HeaderSocialLinksProps {
  onNavigate?: () => void;
  secureLinks?: boolean;
}

export function HeaderSocialLinks({ onNavigate, secureLinks = false }: HeaderSocialLinksProps) {
  return (
    <div className="external-links">
      <Link
        className="external-icon-link"
        target="_blank"
        rel={secureLinks ? 'noopener noreferrer' : undefined}
        to={GITHUB_HREF}
        id="gh-icon-link"
        aria-label={copy.site.social.githubProfileLabel}
        onClick={onNavigate}
      >
        <GitHubIcon />
      </Link>
      <Link
        className="external-icon-link"
        target="_blank"
        rel={secureLinks ? 'noopener noreferrer' : undefined}
        to={LINKEDIN_HREF}
        id="in-icon-link"
        aria-label={copy.site.social.linkedinProfileLabel}
        onClick={onNavigate}
      >
        <LinkedInIcon />
      </Link>
    </div>
  );
}
