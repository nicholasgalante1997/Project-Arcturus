import type { ReactNode } from 'react';

interface AboutExternalLinkProps {
  href: string;
  children: ReactNode;
}

function AboutExternalLink({ href, children }: AboutExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

export default AboutExternalLink;
