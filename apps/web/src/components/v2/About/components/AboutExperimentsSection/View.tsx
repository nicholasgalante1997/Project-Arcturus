import copy from '@/content/en.json';

import { AboutExternalLink } from '../AboutExternalLink';
import { AboutSectionHeader } from '../AboutSectionHeader';

const { about } = copy;

function AboutExperimentsSection() {
  return (
    <section className="v2-about-section">
      <AboutSectionHeader
        kicker={about.sectionLabels.index}
        title={about.experiments.title}
        introduction={about.experiments.introduction}
      />
      <div className="v2-about-experiments">
        {about.experiments.projects.map((project) => (
          <article key={project.name}>
            <h3>
              {project.href ? (
                <AboutExternalLink href={project.href}>{project.name}</AboutExternalLink>
              ) : (
                project.name
              )}
            </h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutExperimentsSection;
