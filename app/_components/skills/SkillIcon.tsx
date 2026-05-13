import { SkillDataProps } from "@/app/_lib/data";

export default function SkillIcon(skill: SkillDataProps) {
  return (
    <div
      key={skill.id}
      className="flex flex-col items-center gap-2 text-center"
    >
      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-light/12 rounded-xl flex items-center justify-center p-3 backdrop-blur-sm border border-light/16">
        <img
          src={skill.src}
          alt={`SVG logo of ${skill.label}`}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="flex flex-wrap max-w-20 text-xs uppercase text-grey text-nowrap justify-center">
        {skill.label}
      </span>
    </div>
  );
}
