import { memo } from 'react';

import { pipeline } from '@/utils/pipeline';
import { withProfiler } from '@/utils/profiler';

import { AboutContactSection } from './components/AboutContactSection';
import { AboutElsewhereSection } from './components/AboutElsewhereSection';
import { AboutExperienceSection } from './components/AboutExperienceSection';
import { AboutExperimentsSection } from './components/AboutExperimentsSection';
import { AboutHero } from './components/AboutHero';
import { AboutNavigation } from './components/AboutNavigation';
import { AboutPrinciplesSection } from './components/AboutPrinciplesSection';
import { AboutTechnicalRangeSection } from './components/AboutTechnicalRangeSection';
import { AboutWorkSection } from './components/AboutWorkSection';

function V2AboutPageView() {
  return (
    <div className="v2-about-page v2-about-editorial">
      <div className="wrapper">
        <AboutHero />
        <AboutNavigation />
        <div>
          <AboutContactSection />
          <AboutExperienceSection />
          <AboutWorkSection />
          <AboutTechnicalRangeSection />
          <AboutPrinciplesSection />
          <AboutExperimentsSection />
          <AboutElsewhereSection />
        </div>
      </div>
    </div>
  );
}

export default pipeline(memo, withProfiler('v2_About_Page_View'))(V2AboutPageView);
