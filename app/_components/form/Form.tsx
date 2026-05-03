"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import SkillIcon from "../skills/SkillIcon";
import { skillData } from "@/app/_lib/data";

export default function Form() {
  const { scrollYProgress, scrollY } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.85, 0.95, 1],
    [1, 0.8, 1, 1],
  );

  return (
    <motion.section
      style={{ opacity, scale }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="max-w-3xl">
        <motion.h1>Contact Form</motion.h1>
      </div>
    </motion.section>
  );
}
