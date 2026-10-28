import { memo } from 'react';

import copy from '@/content/en.json';
import { pipeline } from '@/utils/pipeline';

import { HeroContent } from './components';

import type { HeroWidgetProps } from '../../types';

const DEFAULT_HEADLINE = copy.home.hero.title;
const DEFAULT_SUBHEADLINE = copy.home.hero.subtitle;
const DEFAULT_CTA_TEXT = copy.home.hero.cta;
const DEFAULT_CTA_HREF = '/posts';
const DEFAULT_TOOLTIP_TEXT = copy.home.hero.tooltipMessage;

function HeroWidgetView({
  headline = DEFAULT_HEADLINE,
  subheadline = DEFAULT_SUBHEADLINE,
  ctaText = DEFAULT_CTA_TEXT,
  ctaHref = DEFAULT_CTA_HREF,
  tooltipMessage = DEFAULT_TOOLTIP_TEXT
}: HeroWidgetProps) {
  return (
    <section className="v2-hero" aria-labelledby="hero-headline">
      <HeroContent
        headline={headline}
        subheadline={subheadline}
        ctaText={ctaText}
        ctaHref={ctaHref}
        tooltipMessage={tooltipMessage}
      />
    </section>
  );
}

export default pipeline(memo)(HeroWidgetView);
