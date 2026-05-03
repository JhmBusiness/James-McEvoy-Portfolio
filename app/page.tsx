"use client";

import { useScroll, useTransform } from "framer-motion";
import Hero from "./_components/page/Hero";
import Skills from "./_components/page/Skills";
import Form from "./_components/form/Form";

export default function Home() {
  const { scrollYProgress, scrollY } = useScroll();

  // We explicitly map the ranges.
  // Any scroll progress beyond 0.15 will now stay at 0 opacity.
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  // This "Y" transform pushes the text away once it's faded
  // so it doesn't accidentally block clicks or reappear.
  const y = useTransform(scrollYProgress, [0, 0.1, 0.11], [0, 0, -2000]);

  console.log(scrollYProgress);

  return (
    <>
      {/* Hero */}
      <Hero />
      {/* Track */}
      {/* Final Screen: Footer or Contact */}

      <div className="h-[800vh] w-full pointer-events-none" />

      {/* Skills */}
      <Skills />

      <Form />
    </>
  );
}
