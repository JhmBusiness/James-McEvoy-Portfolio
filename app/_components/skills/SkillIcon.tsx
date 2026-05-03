import { SkillDataProps } from "@/app/_lib/data";

export default function SkillIcon(skill: SkillDataProps) {
  return (
    <div key={skill.id} className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-light/12 rounded-xl flex items-center justify-center p-3 backdrop-blur-sm border border-light/16">
        <img
          src={skill.src}
          alt={`SVG logo of ${skill.label}`}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-xs uppercase text-grey">{skill.label}</span>
    </div>
  );
}
