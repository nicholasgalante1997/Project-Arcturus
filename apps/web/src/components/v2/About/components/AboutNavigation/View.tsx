import copy from '@/content/en.json';

const { about } = copy;

function AboutNavigation() {
  return (
    <nav className="v2-about-index" aria-label={about.navigationLabel}>
      <span>{about.navigationLabel}</span>
      <ol>
        {about.navigation.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default AboutNavigation;
