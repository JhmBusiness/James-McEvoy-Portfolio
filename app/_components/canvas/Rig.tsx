"use client";

import { useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";

interface RigProps {
  activeId: number | null;
}

export default function Rig({ activeId }: RigProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

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
  }, []);

  useFrame((state) => {
    const startZ = 8;
    const endZ = -80;
    const targetZ = startZ + scrollProgress * (endZ - startZ);

    // Smooth camera movement
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.05,
    );

    // Mouse parallax
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
  });

  return null;
}
