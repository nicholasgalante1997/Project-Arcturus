import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import { AnchorTooltip } from '@/components/v2/shared/AnchorTooltip';
import config from '@/config/config';
import copy from '@/content/en.json';

import { AboutExternalLink } from '../AboutExternalLink';

const { about } = copy;
const TOOLTIP_ANCHOR_CLASS = 'subheadline-tooltip';
const TOOLTIP_ANCHOR_NAME = `--${TOOLTIP_ANCHOR_CLASS}`;
const TOOLTIP_ID = 'about-hero-introduction-tooltip';

function AboutHero() {
  const introductionRef = useRef<HTMLParagraphElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const introductionElement = introductionRef.current;
    if (!introductionElement) return;

    introductionElement.innerHTML = about.hero.introduction;

    const anchor = introductionElement.querySelector<HTMLElement>(`.${TOOLTIP_ANCHOR_CLASS}`);
    if (!anchor) return;

    const show = () => setShowTooltip(true);
    const hide = () => setShowTooltip(false);

    anchor.tabIndex = 0;
    anchor.setAttribute('aria-describedby', TOOLTIP_ID);
    anchor.addEventListener('mouseenter', show);
    anchor.addEventListener('mouseleave', hide);
    anchor.addEventListener('focus', show);
    anchor.addEventListener('blur', hide);

    return () => {
      anchor.removeEventListener('mouseenter', show);
      anchor.removeEventListener('mouseleave', hide);
      anchor.removeEventListener('focus', show);
      anchor.removeEventListener('blur', hide);
    };
  }, []);

  return (
    <header className="v2-about-intro">
      <h1>{about.hero.title}</h1>
      <p className="v2-about-intro__lead" ref={introductionRef} />
      <AnchorTooltip
        id={TOOLTIP_ID}
        className="v2-about-intro__tooltip"
        visible={showTooltip}
        anchor={TOOLTIP_ANCHOR_NAME}
      >
        {about.hero.tooltipMessage}
      </AnchorTooltip>
      <p className="v2-about-intro__role">{about.hero.role}</p>
      <p className="v2-about-intro__availability">{about.hero.availability}</p>
      <div className="v2-about-actions" aria-label={about.profileLinksLabel}>
        <Link className="v2-about-button v2-about-button--primary" to="/contact">
          {about.hero.contactLabel}
        </Link>
        <AboutExternalLink href={config.LINKS.GITHUB}>{about.hero.githubLabel}</AboutExternalLink>
        <AboutExternalLink href={config.LINKS.LINKEDIN}>{about.hero.linkedinLabel}</AboutExternalLink>
      </div>
    </header>
  );
}

export default AboutHero;
