"use client";

import { IsMobile } from "@/app/_lib/interfaces";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function HeroMesh({ isMobile }: IsMobile) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;

    const hue = 0.6 + Math.sin(t * 0.2) * 0.1;
    materialRef.current.color.setHSL(hue, 0.8, 0.5);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={isMobile ? [1.6, 0] : [3, 0]} />
        <meshStandardMaterial
          ref={materialRef}
          wireframe
          transparent
          opacity={0.6}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}
