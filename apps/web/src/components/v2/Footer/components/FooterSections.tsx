import { Link } from 'react-router';

import type { FooterSection } from '../types';

interface FooterSectionsProps {
  sections: FooterSection[];
}

export function FooterSections({ sections }: FooterSectionsProps) {
  return (
    <div className="v2-footer__sections">
      {sections.map((section) => (
        <div key={section.title} className="v2-footer__section">
          <h3 className="v2-footer__section-title">{section.title}</h3>
          <ul className="v2-footer__link-list">
            {section.links.map((link) => (
              <li key={link.href} className="v2-footer__link-item">
                {link.external ? (
                  <a href={link.href} className="v2-footer__link" target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.href} className="v2-footer__link">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
