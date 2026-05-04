"use client";
import { Environment, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import HeroMesh from "./HeroMesh";
import ProjectsContainer from "./ProjectsContainer";
import Rig from "./Rig";
import TerminalBackground from "./TerminalBackground";

export default function Scene() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100dvw",
        height: "100dvh",
      }}
      dpr={[1, 2]} // Dpr (device pixel ratio) lets newer displays avoid stretching low res images by doubling the pixels used in this case. The 1 tells you to use the standard res for older monitors, while the 2 means to double. 3, and 4 can be used, but this could over work both battery and the gpu.
    >
      <Suspense fallback={null}>
        {/* Ambient light for general visibility */}
        <ambientLight intensity={0.5} />
        <Environment near={1} far={1000} resolution={256} preset="city" />
        {/* A point light to create shadows and highlights on the button */}
        <pointLight position={[10, 10, 10]} intensity={1.5} />

        {/* The Deep Space Background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={1}
          fade
          speed={1}
        />

        <Rig />
        <HeroMesh />
        <ProjectsContainer setActiveId={setActiveId} />

        <TerminalBackground />

        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      </Suspense>
    </Canvas>
  );
}
