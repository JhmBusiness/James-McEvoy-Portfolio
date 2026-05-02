"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // We explicitly map the ranges.
  // Any scroll progress beyond 0.15 will now stay at 0 opacity.
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  // This "Y" transform pushes the text away once it's faded
  // so it doesn't accidentally block clicks or reappear.
  const y = useTransform(scrollYProgress, [0, 0.1, 0.11], [0, 0, -2000]);

  return (
    <>
      <motion.section
        style={{
          opacity,
          scale,
          y, // Moves the element out of the way once faded
        }}
        className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="z-20 text-center pointer-events-none">
          <h1 className="pointer-events-none">JAMES MCEVOY</h1>
          <p className="mt-4 pointer-events-none text-gray-400">
            Scroll to start exploring.
          </p>
        </div>
      </motion.section>
      {/* Track */}
      <div className="h-[600vh] w-full pointer-events-none" />
      {/* Final Screen: Footer or Contact */}

      <section className="flex h-screen items-center justify-center pointer-events-none">
        <h2 className="text-4xl uppercase pointer-events-none">Form time!</h2>
      </section>
    </>
  );
}
