import copy from '@/content/en.json';

import { AboutSectionHeader } from '../AboutSectionHeader';

const { about } = copy;

function AboutPrinciplesSection() {
  return (
    <section id="how-i-engineer" className="v2-about-section">
      <AboutSectionHeader
        kicker={about.sectionLabels.principles}
        title={about.principles.title}
        introduction={about.principles.introduction}
      />
      <div className="v2-about-principles">
        {about.principles.items.map((principle, index) => (
          <article key={principle.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutPrinciplesSection;
