import copy from '@/content/en.json';

const { about } = copy;

function AboutElsewhereSection() {
  return (
    <section id="elsewhere" className="v2-about-section v2-about-elsewhere">
      <header className="v2-about-section__header">
        <p className="v2-about-section__kicker">{about.sectionLabels.elsewhere}</p>
        <h2>{about.elsewhere.title}</h2>
      </header>
      <div>
        {about.elsewhere.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default AboutElsewhereSection;
