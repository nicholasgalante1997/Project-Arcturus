import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

import copy from '@/content/en.json';

import SocialIcons from '../SocialIcons';

import type { SocialLink } from '../types';

interface FooterBrandProps {
  socialLinks: SocialLink[];
}

export function FooterBrand({ socialLinks }: FooterBrandProps) {
  const footerTaglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (footerTaglineRef.current && footerTaglineRef.current.innerHTML !== copy.site.footer.tagline) {
      footerTaglineRef.current.innerHTML = copy.site.footer.tagline;
    }
  }, []);

  return (
    <div className="v2-footer__brand">
      <Link to="/" className="v2-footer__logo">
        <span className="v2-footer__logo-text">{copy.site.name}</span>
      </Link>
      <p className="v2-footer__tagline" ref={footerTaglineRef} />
      <SocialIcons links={socialLinks} />
    </div>
  );
}
