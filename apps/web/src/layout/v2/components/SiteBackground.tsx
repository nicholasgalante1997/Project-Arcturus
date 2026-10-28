import type { BackgroundTreatment } from '../background';

/** Shared, non-interactive background. Alternative studies remain URL-accessible. */
export function SiteBackground({ treatment = 'paper' }: { treatment?: BackgroundTreatment }) {
  return (
    <div className={`v2-site-background v2-site-background--${treatment}`} aria-hidden="true">
      {treatment === 'drafting' && (
        <svg className="v2-site-background__drawing" viewBox="0 0 640 640" fill="none">
          <g className="v2-site-background__construction" stroke="currentColor" strokeWidth="1">
            <circle cx="352" cy="288" r="216" />
            <circle cx="352" cy="288" r="160" />
            <circle cx="352" cy="288" r="104" />
            <path d="M352 32v512M96 288h512M128 512 576 64" />
            <path d="M112 72h16m-8-8v16M576 504h16m-8-8v16M112 504h16m-8-8v16" />
          </g>
          <g className="v2-site-background__plot" stroke="currentColor" strokeWidth="1.5">
            <path d="M136 288a216 216 0 0 1 216-216M352 448a160 160 0 0 0 160-160" />
            <path d="m240 400 112-112 160-56" />
            <circle cx="240" cy="400" r="4" />
            <circle cx="352" cy="288" r="4" />
            <circle cx="512" cy="232" r="4" />
          </g>
        </svg>
      )}
      {treatment === 'contours' && (
        <svg className="v2-site-background__contours" viewBox="0 0 800 800" fill="none">
          <g stroke="currentColor" strokeWidth="1">
            {Array.from({ length: 12 }, (_, index) => (
              <path
                key={index}
                d="M80 820C-80 580 420 660 300 380S380-60 780 40"
                transform={`translate(${index * 28} ${index * -18})`}
              />
            ))}
          </g>
        </svg>
      )}
    </div>
  );
}
