// This component works out the x and y coordinates for the project cards, and then maps the project data to create a grid (also including a fixed z coordinate).
import { projectData } from "@/app/_lib/data";
import { Dispatch, SetStateAction } from "react";
import ProjectMonolith from "../projects/ProjectMonolith";
import { ModalName, useModal } from "@/app/_context/ModalContext";
import { IsMobile } from "@/app/_lib/interfaces";

interface ProjectsContainerProps extends IsMobile {
  setActiveId: Dispatch<SetStateAction<number | null>>;
  scrollProgress: number;
  setScrollProgress: Dispatch<SetStateAction<number>>;
}

export default function ProjectsContainer({
  setActiveId,
  isMobile,
  scrollProgress,
  setScrollProgress,
}: ProjectsContainerProps) {
  const { openModal } = useModal();

  const COLUMN_COUNT = isMobile ? 2 : 3;
  const X_SPACING = isMobile ? 5.5 : 8; // Distance between columns
  const Y_SPACING = isMobile ? 6.5 : 8; // Distance between rows

  function handleProjectClick(id: number | null, modalName: ModalName) {
    setActiveId(id);
    openModal(modalName);
    return null;
  }

  return (
    <>
      {projectData.map((pro, i) => {
        // Calculate grid coordinates:
        // Using pro's index, we are able to calculate the x coordinates
        const x = isMobile
          ? ((i % COLUMN_COUNT) - 0.5) * X_SPACING
          : ((i % COLUMN_COUNT) - 1) * X_SPACING;

        // Similar to x coordinates, we are able to work out y using index.
        const y =
          Math.floor(i / COLUMN_COUNT) === 0
            ? Y_SPACING / 1.5
            : -Y_SPACING / 1.5;

        const mobileY = (1 - Math.floor(i / 2)) * Y_SPACING;

        // Lastly give each card the same z coordinate to be in line.
        const gridPosition: [number, number, number] = [
          x,
          isMobile ? mobileY : y,
          -60,
        ];

        return (
          <ProjectMonolith
            key={pro.id}
            isMobile={isMobile}
            {...pro}
            position={gridPosition}
            handleProjectClick={handleProjectClick}
            scrollProgress={scrollProgress}
            setScrollProgress={setScrollProgress}
          />
        );
      })}
    </>
  );
}
