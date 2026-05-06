"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Terminal() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadBarPercent, setLoadBarPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far we've scrolled (0 to 1)
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    // This runs when the component unmounts
    return () => {
      setLoadBarPercent(0);
    };
  }, []);

  gsap.registerPlugin(useGSAP);
  const loadingScreen = useRef(null);
  const loadingBar = useRef(null);

  useGSAP(
    () => {
      // Only run if the progress is 1 AND the element exists
      if (scrollProgress === 1 && loadingScreen.current) {
        const tl = gsap.timeline();

        setLoadBarPercent(0);

        tl.to(loadingScreen.current, { delay: 0.8, opacity: 1, duration: 0.05 })
          .to(loadingScreen.current, { opacity: 0, duration: 0.05 })
          .to(loadingScreen.current, { opacity: 0.7, duration: 0.1 })
          .to(loadingScreen.current, { opacity: 0.1, duration: 0.4 })
          .to(loadingScreen.current, { opacity: 1, duration: 0.05 })
          .to(loadingScreen.current, { opacity: 0.3, duration: 0.05 })
          .to(loadingScreen.current, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });

        // Need to do!!! Adjust loadbar to pause every so often.
        tl.set(loadingBar.current, { width: 0 }).to(loadingBar.current, {
          delay: 0.8,
          duration: 4,
          width: "99%",
          ease: "rough({strength: 3, points: 50, template: strong.inOut, taper: both, randomize: false})",
          onUpdate: function () {
            const currentPercent = Math.round(this.progress() * 100);
            setLoadBarPercent(currentPercent);
          },
        });
      }
    },
    { scope: loadingScreen, dependencies: [scrollProgress] },
  );

  return (
    <>
      <AnimatePresence>
        {scrollProgress === 1 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="fixed inset-0 z-10 w-4/5 h-4/5 flex justify-center items-center text-center m-auto"
          >
            <div ref={loadingScreen}>
              <h4>J-MCE.BOT</h4>
              <div className="relative w-100 h-8 border border-accent mt-3 mb-1">
                <div
                  ref={loadingBar}
                  className="w-0 h-[calc(100%-4px)] p-px bg-accent mt-0.5 ml-0.5"
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">CONNECTING TO STATION_J-MCE</p>
                <p className="text-sm">{loadBarPercent}%</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
