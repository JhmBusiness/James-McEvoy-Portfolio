"use client";
import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function TerminalBackground() {
  const brandColor = "#26CEFD";
  const groupRef = useRef<THREE.Group>(null);

  const [showEdge, setShowEdge] = useState(false);

  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const edgeMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const camera = state.camera as THREE.PerspectiveCamera;
    const { fov } = camera;

    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.scrollY / totalHeight;

    const startSize = 0.1;
    const endSize = 0.8;
    const growthTrigger = 0.75;

    let currentSize = startSize;
    let opacityValue = 0;

    if (progress > growthTrigger) {
      setShowEdge(true);
      const growthProgress = (progress - growthTrigger) / (1 - growthTrigger);
      currentSize = THREE.MathUtils.lerp(startSize, endSize, growthProgress);

      opacityValue = growthProgress;
    }

    if (progress < growthTrigger) {
      setShowEdge(false);
    }

    if (materialRef.current) {
      materialRef.current.opacity = opacityValue * 0.8;
      materialRef.current.visible = progress > growthTrigger;
    }

    if (edgeMaterialRef.current) {
      edgeMaterialRef.current.opacity = opacityValue;
      edgeMaterialRef.current.visible = progress > growthTrigger;
    }

    const distance = camera.position.z - groupRef.current.position.z;
    const visibleHeight = 2 * Math.tan((fov * Math.PI) / 180 / 2) * distance;
    const visibleWidth = visibleHeight * state.viewport.aspect;

    groupRef.current.scale.x = (visibleWidth * currentSize) / 16;
    groupRef.current.scale.y = (visibleHeight * currentSize) / 9;
  });

  return (
    <group ref={groupRef} position={[0, 0, -148]}>
      <mesh>
        <boxGeometry args={[16, 9, 0.2]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#050505"
          metalness={1}
          roughness={0.4}
          transparent={true}
          opacity={0.8}
        />
        {showEdge && (
          <Edges threshold={15} color={brandColor} transparent={true}>
            <meshBasicMaterial
              ref={edgeMaterialRef}
              color={brandColor}
              toneMapped={false}
            />
          </Edges>
        )}
      </mesh>
    </group>
  );
}
