import { ModalName } from "@/app/_context/ModalContext";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface ProjectMonolithProps {
  id: number;
  position: [number, number, number];
  title: string;
  modalName: ModalName;
  handleProjectClick: (id: number | null, modalName: ModalName) => void;
}

export default function ProjectMonolith({
  id,
  position,
  title,
  modalName,
  handleProjectClick,
}: ProjectMonolithProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate how far we've scrolled (0 to 1) and update scrollProgress through percentage.
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 2.4;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // moveDir will determine where the initial positions of the cards will be.
  const moveDir = useMemo(() => {
    switch (id) {
      case 1:
        return { x: -5, y: 5, z: 2 }; // Top Left
      case 2:
        return { x: 0, y: 6, z: -2 }; // Top Mid
      case 3:
        return { x: 5, y: 5, z: 5 }; // Top Right
      case 4:
        return { x: -5, y: -5, z: -5 }; // Bottom Left
      case 5:
        return { x: 0, y: -6, z: 2 }; // Bottom Mid
      case 6:
        return { x: 5, y: -5, z: -2 }; // Bottom Right
      default:
        return { x: 0, y: 0, z: 0 };
    }
  }, [id]);

  useFrame((state) => {
    // Math.max locks the cards into place by makign sure the value doesn't become negative.
    const scatterStrength = Math.max(1 - scrollProgress, 0);

    // Once scatter strength is 0 (locked out as said above) the original position of posX, Y, and Z come into play.
    const [posX, posY, posZ] = position;
    meshRef.current.position.x = posX + moveDir.x * scatterStrength;
    meshRef.current.position.y = posY + moveDir.y * scatterStrength;
    meshRef.current.position.z = posZ + moveDir.z * scatterStrength;

    // By multiplying the clockspeed by scatter strength, when SS reaches 0, rotation becomes 0, locking it.
    meshRef.current.rotation.x =
      (state.clock.elapsedTime * 0.2 + id) * scatterStrength;
    meshRef.current.rotation.y =
      (state.clock.elapsedTime * 0.3 + id) * scatterStrength;

    // Here we use a final check to ensure the cards are locked.
    if (scatterStrength <= 0) {
      meshRef.current.rotation.set(0, 0, 0);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation(); // Prevents clicking through to objects behind
        handleProjectClick(id, modalName);
      }}
    >
      <boxGeometry args={[6, 9, 0.2]} />
      <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}
