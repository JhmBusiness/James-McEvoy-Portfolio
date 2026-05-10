"use client";
import { hudScript } from "@/app/_lib/data";
import { useGSAP } from "@gsap/react";
import { MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrambleTextPlugin, TextPlugin } from "gsap/all";
import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
  scrollYProgress: MotionValue<number>;
}

gsap.registerPlugin(useGSAP, TextPlugin, ScrambleTextPlugin);

export default function SectionTitle({ scrollYProgress }: SectionTitleProps) {
  const titleRef = useRef(null);
  const [section, setSection] = useState(0);
  const introTimeline = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      if (value < 0.24) {
        setSection(1);
      } else if (value > 0.24 && value < 0.55) {
        setSection(2);
      } else if (value > 0.55 && value < 0.75) {
        setSection(3);
      } else {
        setSection(4);
      }
    });
  }, [scrollYProgress]);

  // Intro animation
  useGSAP(() => {
    introTimeline.current = gsap.timeline();

    introTimeline.current.to(titleRef.current, {
      delay: 0.8,
      duration: 1.6,
      text: hudScript[0].label,
    });

    introTimeline.current.to(titleRef.current, {
      delay: 0.8,
      duration: 1.6,
      text: hudScript[1].label,
    });
  }, []);

  // Section changes animation
  useGSAP(() => {
    if (section > 0) {
      introTimeline.current?.kill();

      gsap.killTweensOf(titleRef.current);

      gsap.to(titleRef.current, {
        duration: 1.6,
        text: hudScript[section].label,
      });
    }
  }, [section]);

  return (
    <div className="uppercase hud-title-bg flex items-center justify-center w-full mt-6 h-12">
      <h5 ref={titleRef}></h5>
    </div>
  );
}
