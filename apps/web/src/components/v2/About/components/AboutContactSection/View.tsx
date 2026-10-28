import { Link } from 'react-router';

import config from '@/config/config';
import copy from '@/content/en.json';

import { AboutExternalLink } from '../AboutExternalLink';

const { about } = copy;

function AboutContactSectionView() {
  return (
    <section className="v2-about-closing" aria-labelledby="about-closing-title">
      <h2 id="about-closing-title">{about.closing.title}</h2>
      <p>{about.closing.description}</p>
      <div className="v2-about-actions">
        <Link className="v2-about-button v2-about-button--primary" to="/contact">
          {about.closing.contactLabel}
        </Link>
        <AboutExternalLink href={config.LINKS.GITHUB}>{about.closing.githubLabel}</AboutExternalLink>
        <AboutExternalLink href={config.LINKS.LINKEDIN}>{about.closing.linkedinLabel}</AboutExternalLink>
      </div>
    </section>
  );
}

export default AboutContactSectionView;
