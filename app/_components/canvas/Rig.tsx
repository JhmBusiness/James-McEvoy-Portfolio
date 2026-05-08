"use client";

import { IsMobile } from "@/app/_lib/interfaces";
import { useFrame } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as THREE from "three";

interface RigProps extends IsMobile {
  setCurrentSection: Dispatch<SetStateAction<number>>;
  currentSection: number;
  scrollProgress: number;
  setScrollProgress: Dispatch<SetStateAction<number>>;
}

export default function Rig({
  isMobile,
  currentSection,
  setCurrentSection,
  scrollProgress,
  setScrollProgress,
}: RigProps) {
  // Desktop scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far we've scrolled (0 to 1)
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollProgress]);

  useEffect(() => {
    console.log(currentSection);
    console.log(scrollProgress);
  }, [currentSection, scrollProgress]);

  function scrollToSection(section: number) {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const maxSections = 3;

    const progress = section / maxSections;

    const targetScroll = totalHeight * progress;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }

  // Mobile swipe listener and funcs
  function handleSwipeUp() {
    setCurrentSection((prev) => {
      const next = Math.min(prev + 1, 3);

      scrollToSection(next);

      return next;
    });

    setScrollProgress((prev) => {
      return Math.min(prev + 0.25, 1);
    });
  }

  function handleSwipeDown() {
    setCurrentSection((prev) => {
      const next = Math.max(prev - 1, 0);

      scrollToSection(next);

      return next;
    });
    setScrollProgress((prev) => {
      if (prev === 0) return 0;

      return prev - 0.25;
    });
  }

  useEffect(() => {
    if (!isMobile) return;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchStartY - touchEndY;

      // Minimum swipe distance
      const threshold = 80;

      // Swipe up
      if (deltaX > threshold) {
        handleSwipeUp();
      }

      // Swipe down
      if (deltaX < -threshold) {
        handleSwipeDown();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);

      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile]);

  useFrame((state) => {
    const startZ = 8;
    const endZ = isMobile ? -80 : -140;
    const SECTION_DEPTH = 40;
    const targetZ = isMobile
      ? startZ - currentSection * SECTION_DEPTH
      : startZ + scrollProgress * (endZ - startZ);

    // Smooth camera movement
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.05,
    );

    // Mouse parallax
    if (scrollProgress !== 1 && !isMobile) {
      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        state.pointer.x * 1.5,
        0.05,
      );
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        state.pointer.y * 1.5,
        0.05,
      );
    } else {
      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        0,
        0.16,
      );

      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        0,
        0.16,
      );
    }
  });

  return null;
}
