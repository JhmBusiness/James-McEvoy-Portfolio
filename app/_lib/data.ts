import { ModalName } from "../_context/ModalContext";

export interface ProjectMonolithDataProps {
  id: number;
  title: string;
  modalName: ModalName;
  description: string;
  heroImg: string;
  firstImg?: string;
  secondImg?: string;
  thirdImg?: string;
  liveUrl: string;
  logos: string[];
  brandColor: string;
}

export const projectData: ProjectMonolithDataProps[] = [
  {
    id: 1,
    title: "THE POND",
    modalName: "the-pond",
    description:
      "The Pond is a habit tracker built with a social heart. It begins at the dashboard. Users create habits and track their progress. When a user hits a milestone, they share it. These posts appear on a global feed. Others can like or comment. It turns personal discipline into a shared experience.",
    heroImg: "/projects/the-pond/dashboard.png",
    firstImg: "/projects/the-pond/first-img.png",
    secondImg: "/projects/the-pond/second-img.png",
    thirdImg: "/projects/the-pond/third-img.png",
    liveUrl: "https://thepond-by-jhm.netlify.app/",
    logos: [
      "/skills/nextjs.svg",
      "/skills/typescript.svg",
      "/skills/tailwind.svg",
      "/skills/framer.svg",
      "/skills/supabase.svg",
      "/skills/nodejs.svg",
      "/skills/apexCharts.svg",
    ],
    brandColor: "#5A9DBE",
  },
  {
    id: 2,
    title: "SMILING SOLE REFLEXOLOGY",
    modalName: "smiling-sole-reflexology",
    description:
      "Smiling Sole Reflexology is a website built for both clients and employees,  featuring a built in dashboard to manage business inquiries.",
    heroImg: "/projects/smiling-sole-reflexology/hero-img.png",
    firstImg: "/projects/smiling-sole-reflexology/first-img.png",
    secondImg: "/projects/smiling-sole-reflexology/second-img.png",
    thirdImg: "/projects/smiling-sole-reflexology/third-img.png",
    liveUrl: "https://smilingsolereflexology.com/",
    logos: [
      "/skills/nextjs.svg",
      "/skills/tailwind.svg",
      "/skills/framer.svg",
      "/skills/supabase.svg",
      "/skills/nodejs.svg",
    ],
    brandColor: "#5A516D",
  },
  {
    id: 3,
    title: "COBALT DEVELOPMENT",
    modalName: "cobalt-development",
    description:
      "Cobalt Development is a subsidiary company of Cobalt Group. The client wanted a website that followed a matching theme to their other websites; except that this one will both introduce the company and showcase their work.",
    heroImg: "/projects/cobalt-development/hero-img.png",
    firstImg: "/projects/cobalt-development/first-img.png",
    secondImg: "/projects/cobalt-development/second-img.png",
    thirdImg: "",
    liveUrl: "https://cobaltpl.com/cobalt-development/",
    logos: [
      "/skills/nextjs.svg",
      "/skills/tailwind.svg",
      "/skills/framer.svg",
      "/skills/nodejs.svg",
    ],
    brandColor: "#396A39",
  },
  {
    id: 4,
    title: "COBALT CONSTRUCTION",
    modalName: "cobalt-construction",
    description:
      "Cobalt Construction is a subsidiary company of Cobalt Group. It was built to showcase commercial and residential builds using both projects and an integrated map.",
    heroImg: "/projects/cobalt-construction/hero-img.png",
    firstImg: "/projects/cobalt-construction/first-img.png",
    secondImg: "/projects/cobalt-construction/second-img.png",
    liveUrl: "https://cobaltpl.com/cobalt-construction/",
    logos: ["/skills/html.svg", "/skills/css.svg", "/skills/javaScript.svg"],
    brandColor: "#1b4a90",
  },
  {
    id: 5,
    title: "COBALT HUB",
    modalName: "cobalt-hub",
    description:
      "Cobalt Hub was made to group all subsidiary sites of Cobalt Group. Each website is featured here with a short description of what each subsidiary company specialises in.",
    heroImg: "/projects/cobalt-hub/hero-img.png",
    firstImg: "/projects/cobalt-hub/first-img.png",
    secondImg: "",
    thirdImg: "",
    liveUrl: "https://cobaltpl.com/",
    logos: ["/skills/html.svg", "/skills/css.svg", "/skills/javaScript.svg"],
    brandColor: "#FFFFFF",
  },
  {
    id: 6,
    title: "COBALT ALUMINIUM",
    modalName: "cobalt-aluminium",
    description:
      "Cobalt Aluminium, a subsidiary of Cobalt Group was my first client project that I took on. This project features a company that sells windows, doors, and their accessories. The client needed a website to sell these products, and show their technical details.",
    heroImg: "/projects/cobalt-aluminium/hero-img.png",
    firstImg: "/projects/cobalt-aluminium/first-img.png",
    secondImg: "/projects/cobalt-aluminium/second-img.png",
    thirdImg: "/projects/cobalt-aluminium/third-img.png",
    liveUrl: "https://cobaltpl.com/cobalt-aluminium/",
    logos: ["/skills/html.svg", "/skills/css.svg", "/skills/javaScript.svg"],
    brandColor: "#fa7f20",
  },
];
