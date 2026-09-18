import copy from '@/content/en.json';

import { AboutSectionHeader } from '../AboutSectionHeader';

const { about } = copy;

function AboutTechnicalRangeSection() {
  return (
    <section id="technical-range" className="v2-about-section">
      <AboutSectionHeader
        kicker={about.sectionLabels.range}
        title={about.technicalRange.title}
        introduction={about.technicalRange.introduction}
      />
      <div className="v2-about-range">
        {about.technicalRange.groups.map((group) => (
          <article key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.items.join(' · ')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutTechnicalRangeSection;
