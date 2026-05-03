import { motion, useScroll, useTransform } from "framer-motion";
import SkillIcon from "../skills/SkillIcon";
import { skillData } from "@/app/_lib/data";

export default function Skills() {
  const { scrollYProgress, scrollY } = useScroll();

  // We explicitly map the ranges.
  // Any scroll progress beyond 0.15 will now stay at 0 opacity.
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.6, 0.7, 0.75],
    [0, 0, 1, 1, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.6]);

  // This "Y" transform pushes the text away once it's faded
  // so it doesn't accidentally block clicks or reappear.
  const y = useTransform(scrollYProgress, [0, 0.9, 0.9], [0, 0, -2000]);

  return (
    <motion.section
      style={{ opacity, scale, y }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="max-w-3xl">
        <motion.h1>Skills</motion.h1>

        <p className="text-xl text-grey leading-relaxed mb-10 mt-6">
          I am an aspiring Full-stack developer, who brings concept to reality.
          <br />
          Below is my ever-growing list of technologies I specialise in.
        </p>

        <div className="gap-8 items-center flex flex-wrap justify-center">
          {skillData.map((skill, index) => (
            <SkillIcon key={skill.id} {...skill} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
