import copy from '@/content/en.json';
import { formatMessage } from '@/utils/formatMessage';

import { AboutExternalLink } from '../AboutExternalLink';
import { AboutSectionHeader } from '../AboutSectionHeader';

const { about } = copy;

function AboutWorkSection() {
  return (
    <section id="selected-work" className="v2-about-section">
      <AboutSectionHeader
        kicker={about.sectionLabels.work}
        title={about.selectedWork.title}
        introduction={about.selectedWork.introduction}
      />
      <div className="v2-about-projects">
        {about.selectedWork.projects.map((project) => (
          <article key={project.name} className="v2-about-project">
            <div className="v2-about-project__identity">
              <span>{project.index}</span>
              <p>{project.context}</p>
            </div>
            <div className="v2-about-project__body">
              <h3>
                {project.href ? (
                  <AboutExternalLink href={project.href}>{project.name}</AboutExternalLink>
                ) : (
                  project.name
                )}
              </h3>
              <p className="v2-about-project__claim">{project.claim}</p>
              <p className="v2-about-project__description">{project.description}</p>
              <ul
                className="v2-about-evidence"
                aria-label={formatMessage(about.evidenceLabel, { name: project.name })}
              >
                {project.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="v2-about-project__technology">{project.technologies}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutWorkSection;
