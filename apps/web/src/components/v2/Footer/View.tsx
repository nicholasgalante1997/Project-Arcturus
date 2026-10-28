import clsx from 'clsx';
import React from 'react';

import { pipeline } from '@/utils/pipeline';

import { FooterAttribution, FooterBrand, FooterSections } from './components';
import { FOOTER_SECTIONS, SOCIAL_LINKS } from './footerData';

import type { V2FooterProps } from './types';

function V2FooterView({ className }: V2FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={clsx('v2-footer', className)}>
      <div className="v2-footer__container">
        <div className="v2-footer__top">
          <FooterBrand socialLinks={SOCIAL_LINKS} />
          <FooterSections sections={FOOTER_SECTIONS} />
        </div>
        <FooterAttribution year={currentYear} />
      </div>
    </footer>
  );
}

export default pipeline(React.memo)(V2FooterView) as React.MemoExoticComponent<typeof V2FooterView>;
