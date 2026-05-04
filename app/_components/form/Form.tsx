"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import SkillIcon from "../skills/SkillIcon";
import { skillData } from "@/app/_lib/data";

export default function Form() {
  const { scrollYProgress, scrollY } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.85, 0.95, 1],
    [1, 0.8, 1, 1],
  );

  return (
    <motion.section
      style={{ opacity, scale }}
      className="fixed inset-0 z-10 w-4/5 h-4/5 bg-[#0a0a0a]/80 justify-center text-center m-auto"
    >
      <div className="">
        <motion.h1>Contact Form</motion.h1>
      </div>
    </motion.section>
  );
}
