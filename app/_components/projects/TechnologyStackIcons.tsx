interface TechnologyStackIconsProps {
  logos: string[];
}

export default function TechnologyStackIcons({
  logos,
}: TechnologyStackIconsProps) {
  return (
    <>
      {logos.map((logo) => (
        <img
          key={logo}
          src={logo}
          alt="SVG of web technology."
          className="hover:scale-110 duration-200"
        />
      ))}
    </>
  );
}
