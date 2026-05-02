// import { ModalName } from "@/app/_context/ModalContext";
// import { ProjectMonolithDataProps } from "@/app/_lib/data";
// import { Edges, Text } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useEffect, useMemo, useRef, useState } from "react";
// import * as THREE from "three";

// interface ProjectMonolithProps extends ProjectMonolithDataProps {
//   position: [number, number, number];
//   handleProjectClick: (id: number | null, modalName: ModalName) => void;
// }

// export default function ProjectMonolith({
//   id,
//   position,
//   title,
//   modalName,
//   handleProjectClick,
//   brandColor,
// }: ProjectMonolithProps) {
//   const meshRef = useRef<THREE.Mesh>(null!);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   // Calculate how far we've scrolled (0 to 1) and update scrollProgress through percentage.
//   useEffect(() => {
//     const handleScroll = () => {
//       const totalHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (window.scrollY / totalHeight) * 2.4;
//       setScrollProgress(progress);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // moveDir will determine where the initial positions of the cards will be.
//   const moveDir = useMemo(() => {
//     switch (id) {
//       case 1:
//         return { x: -5, y: 5, z: 2 }; // Top Left
//       case 2:
//         return { x: 0, y: 6, z: -2 }; // Top Mid
//       case 3:
//         return { x: 5, y: 5, z: 5 }; // Top Right
//       case 4:
//         return { x: -5, y: -5, z: -5 }; // Bottom Left
//       case 5:
//         return { x: 0, y: -6, z: 2 }; // Bottom Mid
//       case 6:
//         return { x: 5, y: -5, z: -2 }; // Bottom Right
//       default:
//         return { x: 0, y: 0, z: 0 };
//     }
//   }, [id]);

//   useFrame((state) => {
//     // Math.max locks the cards into place by makign sure the value doesn't become negative.
//     const scatterStrength = Math.max(1 - scrollProgress, 0);

//     // Once scatter strength is 0 (locked out as said above) the original position of posX, Y, and Z come into play.
//     const [posX, posY, posZ] = position;
//     meshRef.current.position.x = posX + moveDir.x * scatterStrength;
//     meshRef.current.position.y = posY + moveDir.y * scatterStrength;
//     meshRef.current.position.z = posZ + moveDir.z * scatterStrength;

//     // By multiplying the clockspeed by scatter strength, when SS reaches 0, rotation becomes 0, locking it.
//     meshRef.current.rotation.x =
//       (state.clock.elapsedTime * 0.2 + id) * scatterStrength;
//     meshRef.current.rotation.y =
//       (state.clock.elapsedTime * 0.3 + id) * scatterStrength;

//     // Here we use a final check to ensure the cards are locked.
//     if (scatterStrength <= 0) {
//       meshRef.current.rotation.set(0, 0, 0);
//     }
//   });

//   return (
//     <group
//       ref={meshRef}
//       onClick={(e) => {
//         e.stopPropagation();
//         handleProjectClick(id, modalName);
//       }}
//     >
//       <mesh>
//         <boxGeometry args={[6, 9, 0.2]} />
//         <meshStandardMaterial
//           color="#0a0a0a"
//           metalness={0.9}
//           roughness={0.2}
//           transparent={true}
//           opacity={0.8}
//         />

//         <Edges threshold={15} color={brandColor}>
//           <meshBasicMaterial color={brandColor} toneMapped={false} />
//         </Edges>
//       </mesh>

//       <mesh position={[0, 0, -0.01]}>
//         <boxGeometry args={[5.8, 8.8, 0.1]} />
//         <meshStandardMaterial
//           color="#000000"
//           transparent
//           opacity={0.4}
//           metalness={1}
//           roughness={0}
//         />
//       </mesh>

//       <Text
//         maxWidth={5}
//         fontSize={0.6}
//         textAlign="center"
//         position={[0, 0, 0.22]}
//         color="white"
//       >
//         {title.toUpperCase()}
//       </Text>
//     </group>
//   );
// }

import { ModalName } from "@/app/_context/ModalContext";
import { ProjectMonolithDataProps } from "@/app/_lib/data";
import { Edges, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface ProjectMonolithProps extends ProjectMonolithDataProps {
  position: [number, number, number];
  handleProjectClick: (id: number | null, modalName: ModalName) => void;
}

export default function ProjectMonolith({
  id,
  position,
  title,
  modalName,
  handleProjectClick,
  brandColor,
}: ProjectMonolithProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  const localMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

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

  const moveDir = useMemo(() => {
    switch (id) {
      case 1:
        return { x: -5, y: 5, z: 2 };
      case 2:
        return { x: 0, y: 6, z: -2 };
      case 3:
        return { x: 5, y: 5, z: 5 };
      case 4:
        return { x: -5, y: -5, z: -5 };
      case 5:
        return { x: 0, y: -6, z: 2 };
      case 6:
        return { x: 5, y: -5, z: -2 };
      default:
        return { x: 0, y: 0, z: 0 };
    }
  }, [id]);

  useFrame((state) => {
    const scatterStrength = Math.max(1 - scrollProgress, 0);
    const isLocked = scatterStrength <= 0;

    const [posX, posY, posZ] = position;

    const targetX = posX + moveDir.x * scatterStrength;
    const targetY = posY + moveDir.y * scatterStrength;

    const zPop = hovered && isLocked ? 1 : 0;
    const targetZ = posZ + moveDir.z * scatterStrength + zPop;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.1,
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1,
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.1,
    );

    if (!isLocked) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.clock.elapsedTime * 0.2 + id) * scatterStrength,
        0.1,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.clock.elapsedTime * 0.3 + id) * scatterStrength,
        0.1,
      );
    } else {
      const targetRotX = hovered ? -localMouse.current.y * 0.1 : 0;
      const targetRotY = hovered ? localMouse.current.x * 0.1 : 0;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.1,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.1,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        0,
        0.1,
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        if (hovered) {
          localMouse.current.x = (e.uv!.x - 0.5) * 2;
          localMouse.current.y = (e.uv!.y - 0.5) * 2;
        }
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        localMouse.current.set(0, 0);
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleProjectClick(id, modalName);
      }}
    >
      <mesh>
        <boxGeometry args={[6, 9, 0.2]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.15}
          transparent={true}
          opacity={0.8}
        />
        <Edges threshold={15} color={brandColor}>
          <meshBasicMaterial color={brandColor} toneMapped={false} />
        </Edges>
      </mesh>

      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[5.8, 8.8, 0.1]} />
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.4}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <Text
        maxWidth={5}
        fontSize={0.6}
        textAlign="center"
        position={[0, 0, 0.22]}
        color="white"
      >
        {title.toUpperCase()}
        <meshStandardMaterial
          emissive="white"
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </Text>
    </group>
  );
}
