"use client";

import { useModal } from "@/app/_context/ModalContext";
import { IsMobile } from "@/app/_lib/interfaces";
import { useFrame } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
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
  // ModalState
  const { modalState } = useModal();
  const scrollThreshold = isMobile ? 0.98 : 0.75;

  // Desktop scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far we've scrolled (0 to 1)
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollProgress]);

  // Prevents scroll history and restarts from start of page.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      setScrollProgress(0);
    });
  }, [setScrollProgress]);

  // Mobile swipe listener and funcs - START
  function scrollToSection(section: number) {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const sectionProgress = [0, 0.275, 0.66, 1];

    const targetScroll = totalHeight * sectionProgress[section];

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }

  function handleSwipeUp() {
    setCurrentSection((prev) => {
      const next = Math.min(prev + 1, 3);

      scrollToSection(next);

      return next;
    });
  }

  function handleSwipeDown() {
    setCurrentSection((prev) => {
      const next = Math.max(prev - 1, 0);

      scrollToSection(next);

      return next;
    });
  }

  useEffect(() => {
    if (!isMobile || modalState.name !== null) return;
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
  }, [isMobile, modalState]);
  // Mobile swipe listener and funcs - END

  // Keyboard controls, click events, and funcs - START
  useEffect(() => {
    if (isMobile || modalState.name !== null) return;

    function handleKeyboardControls(e: KeyboardEvent) {
      const target = e.target as HTMLElement;

      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      if (e.repeat) return;

      if (["ArrowUp", "ArrowDown"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key === "ArrowUp") {
        setCurrentSection((prev) => {
          const next = Math.min(prev + 1, 3);

          scrollToSection(next);

          return next;
        });
      }

      if (e.key === "w") {
        if (scrollProgress >= 0.99) return;
        setCurrentSection((prev) => {
          const next = Math.min(prev + 1, 3);

          scrollToSection(next);

          return next;
        });
      }

      if (e.key === "ArrowDown") {
        setCurrentSection((prev) => {
          const next = Math.max(prev - 1, 0);

          scrollToSection(next);

          return next;
        });
      }

      if (e.key === "s") {
        if (scrollProgress >= 0.99) return;

        setCurrentSection((prev) => {
          const next = Math.max(prev - 1, 0);

          scrollToSection(next);

          return next;
        });
      }
    }

    function handleClickControls(e: Event) {
      if (!e.currentTarget) return;
      const element = e.currentTarget as HTMLElement;
      console.log(element.id);
      if (element.id === "hudTopBtn") {
        setCurrentSection((prev) => {
          const next = Math.min(prev + 1, 3);

          scrollToSection(next);

          return next;
        });
      } else if (element.id === "hudBottomBtn") {
        setCurrentSection((prev) => {
          const next = Math.max(prev - 1, 0);

          scrollToSection(next);

          return next;
        });
      } else {
        return;
      }
    }

    window.addEventListener("keydown", handleKeyboardControls);
    document
      .getElementById("hudTopBtn")!
      .addEventListener("click", handleClickControls);
    document
      .getElementById("hudBottomBtn")!
      .addEventListener("click", handleClickControls);
    // Remove event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyboardControls);

      document
        .getElementById("hudTopBtn")
        ?.removeEventListener("click", handleClickControls);

      document
        .getElementById("hudBottomBtn")
        ?.removeEventListener("click", handleClickControls);
    };
  }, [isMobile, modalState.name, setCurrentSection, setScrollProgress]);
  // Keyboard controls and funcs - END

  // Rigs core function
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
    if (scrollProgress < scrollThreshold && !isMobile) {
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

  // Terminal zoom
  const hasScrolledToBottom = useRef(false);

  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "auto";
  }

  function scrollToBottom(duration = 1600) {
    if (isMobile) return;
    const start = window.scrollY;

    const target = document.documentElement.scrollHeight - window.innerHeight;

    const distance = target - start;

    const startTime = performance.now();

    lockScroll();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Exponential zoom
      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        unlockScroll();
      }
    }

    requestAnimationFrame(animate);
  }

  useEffect(() => {
    if (scrollProgress >= 0.75 && !hasScrolledToBottom.current) {
      hasScrolledToBottom.current = true;

      scrollToBottom(1600);
    }
  }, [scrollProgress]);

  return null;
}
