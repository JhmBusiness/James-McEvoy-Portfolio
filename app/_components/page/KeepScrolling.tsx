// "use client";

// import { useScroll, motion, useTransform } from "framer-motion";

// export default function KeepScrolling() {
//   const { scrollYProgress, scrollY } = useScroll();

//   const opacity = useTransform(
//     scrollYProgress,
//     [0, 0.24, 0.28, 0.46],
//     [0, 0, 0.4, 0],
//   );

//   const y = useTransform(scrollYProgress, [0, 0.9, 0.9], [0, 0, -2000]);

//   return (
//     <motion.section
//       style={{ opacity, y }}
//       className="fixed mx-auto bottom-0 inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none"
//     >
//       <h4 className="text-xs text-grey animate-pulse">KEEP SCROLLING</h4>
//     </motion.section>
//   );
// }
