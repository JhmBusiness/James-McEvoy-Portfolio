import { ModalName } from "@/app/_context/ModalContext";
import { ProjectMonolithDataProps } from "@/app/_lib/data";
import { Edges, Image, RoundedBoxGeometry, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { hover } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

interface ProjectMonolithProps extends ProjectMonolithDataProps {
  position: [number, number, number];
  handleProjectClick: (id: number | null, modalName: ModalName) => void;
  isMobile: boolean;
  scrollProgress: number;
  setScrollProgress: Dispatch<SetStateAction<number>>;
}

// Note: Monolith spinning is calibrated for Rig.tsx const startZ = 8; & const endZ = -80;
// Note 2: When we add more sections to the site, the cards will fall out of sync.

export default function ProjectMonolith({
  id,
  position,
  title,
  modalName,
  handleProjectClick,
  brandColor,
  isMobile,
  scrollProgress,
  setScrollProgress,
  pillarImgDesktop,
  pillarImgMobile,
  date,
  number,
  tagDescription,
  projectType,
  icons,
}: ProjectMonolithProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const [hovered, setHovered] = useState(false);

  const localMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

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
    const scatterStrength = isMobile
      ? Math.max(0.58 - scrollProgress * 2.4, 0)
      : Math.max(0.64 - scrollProgress * 2.4, 0);
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

  const spacing = 0.6;
  const totalWidth = (icons.length - 1) * spacing;

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        if (hovered) {
          localMouse.current.x = (e.uv!.x - 0.5) * 0.2;
          localMouse.current.y = (e.uv!.y - 0.5) * 0.2;
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
      <pointLight
        position={[0, 0, 0]}
        intensity={hovered ? 1000 : 0}
        color={brandColor}
        distance={10}
        decay={2}
      />
      <mesh>
        <RoundedBoxGeometry
          radius={0.2}
          args={isMobile ? [5, 6, 0.2] : [6, 9, 0.8]}
        />
        <meshStandardMaterial
          // color={brandColor}
          color="#0a0a0a"
          metalness={1}
          roughness={0.15}
          transparent={true}
          opacity={0.98}
        />
        <Edges threshold={15} color={brandColor}>
          <meshBasicMaterial color={brandColor} toneMapped={false} />
        </Edges>
      </mesh>

      <mesh position={[0, 0, -0.01]}>
        <RoundedBoxGeometry
          radius={0.2}
          args={isMobile ? [4.8, 5.8, 0.1] : [5.8, 8.8, 0.7]}
        />
        <meshStandardMaterial
          color="#0a0a0a"
          // color={brandColor}
          transparent={true}
          opacity={1}
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* Title */}
      <Text
        maxWidth={5}
        fontSize={0.5}
        fontWeight={900}
        textAlign="center"
        position={isMobile ? [0, 1.4, 0.41] : [0, 3.2, 0.41]}
        // position={isMobile ? [0, 1.4, 0.41] : [0, 0, 0.41]}
        color="#fafafa"
        font="/fonts/montserrat-bold.ttf"
      >
        {title.toUpperCase()}
        <meshStandardMaterial
          emissive={hovered ? brandColor : "#fafafa"}
          // emissiveIntensity={hovered ? 2 : 0}
          emissiveIntensity={hovered ? 2 : 0.8}
        />
      </Text>

      {/* Three text */}
      {!isMobile && (
        <>
          <Text
            maxWidth={5}
            fontSize={0.35}
            textAlign="center"
            // position={[-2.53, 2, 0.41]}
            position={[0, 2.1, 0.41]}
            anchorX="center"
            color="#fafafa"
            font="/fonts/sourcesans3-regular.ttf"
          >
            Date: {date}
          </Text>
          <Text
            maxWidth={5}
            fontSize={0.35}
            textAlign="center"
            position={[0, 1.5, 0.41]}
            anchorX="center"
            color="#fafafa"
            font="/fonts/sourcesans3-regular.ttf"
          >
            {tagDescription}
          </Text>
          <Text
            maxWidth={5}
            fontSize={0.35}
            textAlign="center"
            position={[0, 0.9, 0.41]}
            anchorX="center"
            color="#fafafa"
            font="/fonts/sourcesans3-regular.ttf"
          >
            {projectType}
          </Text>
        </>
      )}

      {/* Skill Icons */}
      {!isMobile && (
        <>
          {/* <group position={[-2, 0, 0.1]}>
            {icons.map((icon, index) => (
              <Image
                key={icon}
                url={icon}
                position={[0 + index * 0.6, 0, 0.41]}
                scale={[0.4, 0.4]}
                transparent
              />
            ))}
          </group> */}
          <group position={[0, 0.16, 0.1]}>
            {icons.map((icon, index) => (
              <Image
                key={icon}
                url={icon}
                position={[index * spacing - totalWidth / 2, 0, 0.41]}
                scale={[0.4, 0.4]}
                transparent
              />
            ))}
          </group>
        </>
      )}

      {/* Website img */}
      {pillarImgDesktop && !isMobile && (
        <Image
          url={pillarImgDesktop}
          position={[0, -1.6, 0.41]}
          scale={[5, 2.35]}
          grayscale={hovered ? 0 : 0.05}
        />
      )}
      {pillarImgMobile && isMobile && (
        <Image
          url={pillarImgMobile}
          position={[0, -1.25, 0.41]}
          scale={[4.34, 2.9]}
        />
      )}

      {/* Bar */}
      {!isMobile && (
        <mesh position={[0, -3.2, 0.41]}>
          <planeGeometry args={[5, 0.01]} />
          <meshBasicMaterial color="#fafafa" />
        </mesh>
      )}

      {/* Monolith number */}
      {!isMobile && (
        <Text
          maxWidth={5}
          fontSize={0.4}
          fontWeight={900}
          textAlign="left"
          position={[-2.2, -3.8, 0.41]}
          // position={isMobile ? [0, 1.4, 0.41] : [0, 0, 0.41]}
          color={brandColor}
          font="/fonts/montserrat-semibold.ttf"
        >
          {number}
        </Text>
      )}
      {!isMobile && (
        <Text
          maxWidth={5}
          fontSize={0.4}
          fontWeight={900}
          textAlign="left"
          position={[-1.4, -3.8, 0.41]}
          // position={isMobile ? [0, 1.4, 0.41] : [0, 0, 0.41]}
          color="#fafafa"
          font="/fonts/montserrat-semibold.ttf"
        >
          / 06
        </Text>
      )}
    </group>
  );
}
