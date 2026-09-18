import copy from '@/content/en.json';

import { AboutSectionHeader } from '../AboutSectionHeader';

const { about } = copy;

function AboutExperienceSection() {
  return (
    <section id="experience" className="v2-about-section">
      <AboutSectionHeader
        kicker={about.sectionLabels.history}
        title={about.experience.title}
        introduction={about.experience.introduction}
      />
      <div className="v2-about-experience">
        {about.experience.roles.map((role) => (
          <article key={`${role.organization}-${role.period}`}>
            <time>{role.period}</time>
            <div>
              <h3>{role.role}</h3>
              <p className="v2-about-experience__organization">{role.organization}</p>
              <p>{role.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutExperienceSection;
