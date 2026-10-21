import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import { AnchorTooltip } from '@/components/v2/shared/AnchorTooltip';

const TOOLTIP_ANCHOR_CLASS = 'subheadline-tooltip';
const TOOLTIP_ANCHOR_NAME = `--${TOOLTIP_ANCHOR_CLASS}`;
const TOOLTIP_ID = 'homepage-subheadline-tooltip';

interface HeroContentProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  tooltipMessage: string;
}

export function HeroContent({ headline, subheadline, ctaText, ctaHref, tooltipMessage }: HeroContentProps) {
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const subheadlineElement = subheadlineRef.current;
    if (!subheadlineElement) return;

    subheadlineElement.innerHTML = subheadline;

    const anchor = subheadlineElement.querySelector<HTMLElement>(`.${TOOLTIP_ANCHOR_CLASS}`);
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
  }, [subheadline]);

  return (
    <div className="v2-hero__content">
      <h1 id="hero-headline" className="v2-hero__headline">
        <span>{headline}</span>{' '}
        <img
          className="v2-hero__greeting"
          src="/assets/gifs/waving-pikachu.gif"
          alt=""
          width="50"
          height="46"
          aria-hidden="true"
          style={{ display: 'none' }}
          data-aee="[TODO put base64 here]"
        />
      </h1>
      <p className="v2-hero__subheadline" ref={subheadlineRef}>
        {subheadline}
      </p>
      <AnchorTooltip
        id={TOOLTIP_ID}
        className="v2-hero__tooltip"
        visible={showTooltip}
        anchor={TOOLTIP_ANCHOR_NAME}
      >
        {tooltipMessage}
      </AnchorTooltip>
      <div className="v2-hero__actions">
        <Link to={ctaHref} className="v2-hero__cta">
          {ctaText}
          <svg
            className="v2-hero__cta-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 10h12m0 0l-4-4m4 4l-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
