import { ModalName } from "../_context/ModalContext";

interface ProjectMonolithProps {
  id: number;
  title: string;
  modalName: ModalName;
  description: string;
  imageUrl: string;
  liveUrl: string;
  logos: string[];
}

export const projectData: ProjectMonolithProps[] = [
  {
    id: 1,
    title: "THE POND",
    modalName: "the-pond",
    description:
      "When creating this website, similarly to my Cobalt Aluminium project, I had not yet learnt React.js/Next.js. This website features a map at the bottom of the homepage. When you click on the name of a project on the left side, the icon will appear on the map, in the projects general location in London.",
    imageUrl: "/the-pond.webp", // Path to your local screenshot
    liveUrl: "https://example.com",
    logos: [""],
  },
  {
    id: 2,
    title: "SMILING SOLE REFLEXOLOGY",
    modalName: "smiling-sole-reflexology",
    description:
      "A placeholder for your second project. This will appear further back in the 3D space. You can describe the challenges faced and the solutions you implemented here.",
    imageUrl: "/smiling-sole-reflexology.webp",
    liveUrl: "https://example.com",
    logos: [""],
  },
  {
    id: 3,
    title: "COBALT DEVELOPMENT",
    modalName: "cobalt-development",
    description:
      "A third project to complete the flight path. Notice the Z position is even further away (-50), creating the sense of depth as you scroll.",
    imageUrl: "/cobalt-development.webp",
    liveUrl: "https://example.com",
    logos: [""],
  },
  {
    id: 4,
    title: "COBALT CONSTRUCTION",
    modalName: "cobalt-construction",
    description:
      "A third project to complete the flight path. Notice the Z position is even further away (-50), creating the sense of depth as you scroll.",
    imageUrl: "/cobalt-construction.webp",
    liveUrl: "https://example.com",
    logos: [""],
  },
  {
    id: 5,
    title: "COBALT HUB",
    modalName: "cobalt-hub",
    description:
      "A third project to complete the flight path. Notice the Z position is even further away (-50), creating the sense of depth as you scroll.",
    imageUrl: "/cobalt-hub.webp",
    liveUrl: "https://example.com",
    logos: [""],
  },
  {
    id: 6,
    title: "COBALT ALUMINIUM",
    modalName: "cobalt-aluminium",
    description:
      "A third project to complete the flight path. Notice the Z position is even further away (-50), creating the sense of depth as you scroll.",
    imageUrl: "/cobalt-aluminium.webp",
    liveUrl: "https://example.com",
    logos: [""],
  },
];
