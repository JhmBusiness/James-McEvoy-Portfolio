// This component works out the x and y coordinates for the project cards, and then maps the project data to create a grid (also including a fixed z coordinate).
import { projectData } from "@/app/_lib/data";
import { Dispatch, SetStateAction } from "react";
import ProjectMonolith from "./ProjectMonolith";
import { ModalName, useModal } from "@/app/_context/ModalContext";

const COLUMN_COUNT = 3;
const X_SPACING = 8; // Distance between columns
const Y_SPACING = 8; // Distance between rows

interface ProjectsContainerProps {
  setActiveId: Dispatch<SetStateAction<number | null>>;
}

export default function ProjectsContainer({
  setActiveId,
}: ProjectsContainerProps) {
  const { openModal } = useModal();

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
        const x = ((i % COLUMN_COUNT) - 1) * X_SPACING;

        // Similar to x coordinates, we are able to work out y using index.
        const y =
          Math.floor(i / COLUMN_COUNT) === 0
            ? Y_SPACING / 1.5
            : -Y_SPACING / 1.5;

        // Lastly give each card the same z coordinate to be in line.
        const gridPosition: [number, number, number] = [x, y, -60];

        return (
          <ProjectMonolith
            key={pro.id}
            {...pro}
            position={gridPosition}
            handleProjectClick={handleProjectClick}
          />
        );
      })}
    </>
  );
}
