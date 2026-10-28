import clsx from 'clsx';
import React from 'react';

import copy from '@/content/en.json';
import { pipeline } from '@/utils/pipeline';

import {
  HeaderBrand,
  HeaderNavigation,
  HeaderSocialLinks,
  HeaderThemeToggle,
  MobileMenu
} from './components';

import type { V2HeaderViewProps } from './types';

export { ARCJR_V2_TABS, getActiveTabByPathname } from './constants';

function V2HeaderView({
  transparent = false,
  className,
  isScrolled,
  isMobileMenuOpen,
  onToggleMobileMenu,
  theme,
  onCycleTheme
}: V2HeaderViewProps) {
  const showBackground = !transparent || isScrolled;

  return (
    <header
      className={clsx('v2-header', className)}
      data-scrolled={showBackground}
      data-menu-open={isMobileMenuOpen}
    >
      <div className="container">
        <HeaderBrand />
        <nav aria-label={copy.site.navigationLabel}>
          <HeaderNavigation showActiveState />
        </nav>
        <HeaderSocialLinks secureLinks />
        <HeaderThemeToggle theme={theme} onCycleTheme={onCycleTheme} />
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={copy.site.toggleNavigationLabel}
          aria-expanded={isMobileMenuOpen}
          onClick={onToggleMobileMenu}
        >
          <span className="hamburger">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </span>
        </button>
      </div>

      {isMobileMenuOpen && <MobileMenu onNavigate={onToggleMobileMenu} />}
    </header>
  );
}

export default pipeline(React.memo)(V2HeaderView) as React.MemoExoticComponent<typeof V2HeaderView>;
