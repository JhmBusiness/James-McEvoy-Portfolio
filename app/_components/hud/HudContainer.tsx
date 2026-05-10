"use client";
import { motion, useScroll } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import SectionTitle from "./SectionTitle";

export default function HudContainer() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const { scrollYProgress } = useScroll();

  return (
    <>
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none fixed inset-0 z-40"
        >
          <SectionTitle scrollYProgress={scrollYProgress} />
        </motion.div>
      )}
    </>
  );
}
