import copy from '@/content/en.json';

import { HeaderNavigation } from './HeaderNavigation';
import { HeaderSocialLinks } from './HeaderSocialLinks';

interface MobileMenuProps {
  onNavigate: () => void;
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  return (
    <nav className="mobile-menu" aria-label={copy.site.mobileNavigationLabel}>
      <HeaderNavigation onNavigate={onNavigate} />
      <HeaderSocialLinks onNavigate={onNavigate} />
    </nav>
  );
}
