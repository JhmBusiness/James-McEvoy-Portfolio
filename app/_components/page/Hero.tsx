import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollYProgress, scrollY } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  const y = useTransform(scrollYProgress, [0, 0.1, 0.11], [0, 0, -2000]);

  return (
    <motion.section
      style={{
        opacity,
        scale,
        y,
      }}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="z-20 text-center pointer-events-none">
        <h1 className="pointer-events-none">JAMES MCEVOY</h1>
        <p className="hidden lg:block mt-4 pointer-events-none text-grey">
          Scroll to start exploring.
        </p>
        <p className="lg:hidden mt-4 pointer-events-none text-grey">
          Swipe up and down to explore.
        </p>
      </div>
    </motion.section>
  );
}
