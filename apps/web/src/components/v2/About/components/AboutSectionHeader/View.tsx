interface AboutSectionHeaderProps {
  kicker: string;
  title: string;
  introduction: string;
}

function AboutSectionHeader({ kicker, title, introduction }: AboutSectionHeaderProps) {
  return (
    <header className="v2-about-section__header">
      <p className="v2-about-section__kicker">{kicker}</p>
      <h2>{title}</h2>
      <p>{introduction}</p>
    </header>
  );
}

export default AboutSectionHeader;
