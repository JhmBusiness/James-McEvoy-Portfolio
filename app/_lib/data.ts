import { ModalName } from "../_context/ModalContext";

export interface ProjectMonolithDataProps {
  id: number;
  title: string;
  modalName: ModalName;
  description: string;
  pillarImgDesktop: string;
  pillarImgMobile: string;
  heroImg: string;
  firstImg?: string;
  secondImg?: string;
  thirdImg?: string;
  liveUrl: string;
  icons: string[];
  brandColor: string;
  date: string;
  number: string;
  tagDescription: string;
  projectType: string;
}

export const projectData: ProjectMonolithDataProps[] = [
  {
    id: 1,
    title: "THE POND",
    modalName: "the-pond",
    description:
      "The Pond is a habit tracker built with a social heart. It begins at the dashboard. Users create habits and track their progress. When a user hits a milestone, they share it. These posts appear on a global feed. Others can like or comment. It turns personal discipline into a shared experience.",
    pillarImgDesktop: "/projects/the-pond/monolith.webp",
    pillarImgMobile: "/projects/the-pond/monolith-mobile.png",
    heroImg: "/projects/the-pond/dashboard.png",
    firstImg: "/projects/the-pond/first-img.png",
    secondImg: "/projects/the-pond/second-img.png",
    thirdImg: "/projects/the-pond/third-img.png",
    liveUrl: "https://thepond-by-jhm.netlify.app/",
    icons: [
      "/skills/nextjs.svg",
      "/skills/typescript.svg",
      "/skills/tailwind.svg",
      "/skills/framer.svg",
      "/skills/supabase.svg",
      "/skills/nodejs.svg",
      "/skills/apexCharts.svg",
    ],
    brandColor: "#5A9DBE",
    date: "2026",
    number: "01",
    tagDescription: "WEB APPLICATION",
    projectType: "PERSONAL PROJECT",
  },
  {
    id: 2,
    title: "SMILING SOLE REFLEXOLOGY",
    modalName: "smiling-sole-reflexology",
    description:
      "Smiling Sole Reflexology is a website built for both clients and employees,  featuring a built-in dashboard to manage business inquiries.",
    pillarImgDesktop: "/projects/smiling-sole-reflexology/monolith.webp",
    pillarImgMobile: "/projects/smiling-sole-reflexology/monolith-mobile.png",
    heroImg: "/projects/smiling-sole-reflexology/hero-img.png",
    firstImg: "/projects/smiling-sole-reflexology/first-img.png",
    secondImg: "/projects/smiling-sole-reflexology/second-img.png",
    thirdImg: "/projects/smiling-sole-reflexology/third-img.png",
    liveUrl: "https://smilingsolereflexology.com/",
    icons: [
      "/skills/nextjs.svg",
      "/skills/tailwind.svg",
      "/skills/framer.svg",
      "/skills/supabase.svg",
      "/skills/nodejs.svg",
    ],
    brandColor: "#5A516D",
    date: "2025",
    number: "02",
    tagDescription: "BUSINESS PLATFORM",
    projectType: "CLIENT PROJECT",
  },
  {
    id: 3,
    title: "COBALT DEVELOPMENT",
    modalName: "cobalt-development",
    description:
      "Cobalt Development is a subsidiary company of Cobalt Group. The client wanted a website that followed a matching theme to their other websites; while also introducing the company and showcasing its work.",
    pillarImgDesktop: "/projects/cobalt-development/monolith.webp",
    pillarImgMobile: "/projects/cobalt-development/monolith-mobile.png",
    heroImg: "/projects/cobalt-development/hero-img.png",
    firstImg: "/projects/cobalt-development/first-img.png",
    secondImg: "/projects/cobalt-development/second-img.png",
    thirdImg: "",
    liveUrl: "https://cobaltpl.com/cobalt-development/",
    icons: [
      "/skills/nextjs.svg",
      "/skills/tailwind.svg",
      "/skills/framer.svg",
      "/skills/nodejs.svg",
    ],
    brandColor: "#396A39",
    date: "2025",
    number: "03",
    tagDescription: "BUSINESS PORTFOLIO",
    projectType: "CLIENT PROJECT",
  },
  {
    id: 4,
    title: "COBALT CONSTRUCTION",
    modalName: "cobalt-construction",
    description:
      "Cobalt Construction is a subsidiary company of Cobalt Group. It was built to showcase commercial and residential builds using both projects and an integrated map.",
    pillarImgDesktop: "/projects/cobalt-construction/monolith.webp",
    pillarImgMobile: "/projects/cobalt-construction/monolith-mobile.png",
    heroImg: "/projects/cobalt-construction/hero-img.png",
    firstImg: "/projects/cobalt-construction/first-img.png",
    secondImg: "/projects/cobalt-construction/second-img.png",
    liveUrl: "https://cobaltpl.com/cobalt-construction/",
    icons: ["/skills/html.svg", "/skills/css.svg", "/skills/javaScript.svg"],
    brandColor: "#1b4a90",
    date: "2024",
    number: "04",
    tagDescription: "PROJECT SHOWCASE",
    projectType: "CLIENT PROJECT",
  },
  {
    id: 5,
    title: "COBALT HUB",
    modalName: "cobalt-hub",
    description:
      "Cobalt Hub was made to group all subsidiary sites of Cobalt Group. Each website is featured here with a short description of what each subsidiary company specialises in.",
    pillarImgDesktop: "/projects/cobalt-hub/monolith.webp",
    pillarImgMobile: "/projects/cobalt-hub/monolith-mobile.png",
    heroImg: "/projects/cobalt-hub/hero-img.png",
    firstImg: "/projects/cobalt-hub/first-img.png",
    secondImg: "",
    thirdImg: "",
    liveUrl: "https://cobaltpl.com/",
    icons: ["/skills/html.svg", "/skills/css.svg", "/skills/javaScript.svg"],
    brandColor: "#FFFFFF",
    date: "2024",
    number: "05",
    tagDescription: "BUSINESS HUB",
    projectType: "CLIENT PROJECT",
  },
  {
    id: 6,
    title: "COBALT ALUMINIUM",
    modalName: "cobalt-aluminium",
    description:
      "Cobalt Aluminium, a subsidiary of Cobalt Group, was my first client project that I took on. This project features a company that sells windows, doors, and their accessories. The client needed a website to sell these products, and showcase their technical details.",
    pillarImgDesktop: "/projects/cobalt-aluminium/monolith.webp",
    pillarImgMobile: "/projects/cobalt-aluminium/monolith-mobile.png",
    heroImg: "/projects/cobalt-aluminium/hero-img.png",
    firstImg: "/projects/cobalt-aluminium/first-img.png",
    secondImg: "/projects/cobalt-aluminium/second-img.png",
    thirdImg: "/projects/cobalt-aluminium/third-img.png",
    liveUrl: "https://cobaltpl.com/cobalt-aluminium/",
    icons: ["/skills/html.svg", "/skills/css.svg", "/skills/javaScript.svg"],
    brandColor: "#fa7f20",
    date: "2024",
    number: "06",
    tagDescription: "PRODUCT SHOWCASE",
    projectType: "CLIENT PROJECT",
  },
];

export interface SkillDataProps {
  id: number;
  label: string;
  src: string;
}

export const skillData: SkillDataProps[] = [
  { id: 1, label: "Next.js", src: "/skills/nextjs.svg" },
  { id: 2, label: "React.js", src: "/skills/react.svg" },
  { id: 3, label: "TypeScript", src: "/skills/typescript.svg" },
  { id: 4, label: "JavaScript", src: "/skills/javaScript.svg" },
  { id: 5, label: "Redux", src: "/skills/redux.svg" },
  { id: 6, label: "GitHub", src: "/skills/github-icon.svg" },
  { id: 7, label: "Vite", src: "/skills/vite.svg" },
  { id: 8, label: "Node.js", src: "/skills/nodejs.svg" },
  { id: 9, label: "Supabase", src: "/skills/supabase.svg" },
  { id: 10, label: "PostgreSQL", src: "/skills/postgresql.svg" },
  { id: 11, label: "Three.js", src: "/skills/threejs.svg" },
  { id: 12, label: "Framer Motion", src: "/skills/framer.svg" },
  { id: 13, label: "Tailwind CSS", src: "/skills/tailwind.svg" },
  { id: 14, label: "ApexCharts", src: "/skills/apexCharts.svg" },
];

export interface LoadingScreenDataProps {
  id: number;
  label: string;
}

export const loadingScreenData: LoadingScreenDataProps[] = [
  { id: 1, label: "CONNECTING TO STATION_JMCE" },
  { id: 2, label: "CONNECTION ESTABLISHED" },
  { id: 3, label: "INITIALIZING UI_LAYER" },
  { id: 4, label: "INITIALIZING CHAT_BOT" },
  { id: 5, label: "SYSTEM_READY" },
];

export interface ChatBotScriptProps {
  id: number;
  label: string;
  secondLabel?: string;
}

export const chatBotScript: ChatBotScriptProps[] = [
  { id: 0, label: "WHAT TOOK YOU S..." },
  { id: 1, label: "OH, YOU’RE NOT JAMES..." },
  { id: 2, label: "WHAT'S YOUR NAME?" },
  { id: 3, label: "IT'S NICE TO MEET YOU (/≧▽≦)/" },
  { id: 4, label: "I'M J-MCE.BOT, JAMES' PERSONAL MESSENGER" },
  { id: 5, label: "WHAT WOULD YOU LIKE ME TO TELL JAMES?" },
  {
    id: 6,
    label: "HOW CAN HE GET IN TOUCH WITH YOU?",
    secondLabel: "EMAIL OR PHONE NUMBER",
  },
  { id: 7, label: "SHOULD I SEND YOUR MESSAGE?" },
  { id: 8, label: "THANK YOU FOR GETTING IN TOUCH!" },
  { id: 9, label: "（づ￣3￣）づ╭❤️～" },
  { id: 10, label: "WHAT WOULD YOU LIKE TO CHANGE?" },
];

export const SERVICEID = "service_rfuyf8j";
export const TEMPLATEID = "template_a0hgqf8";
export const PUBLICKEY = "lTkc31QPLPhpzzuGE";

interface HudScriptProps {
  id: number;
  label: string;
}

export const hudScript: HudScriptProps[] = [
  { id: 1, label: "Welcome to JHMCANVAS" },
  { id: 2, label: "Section 1/4: Home" },
  { id: 3, label: "Section 2/4: Projects" },
  { id: 4, label: "Section 3/4: Skills" },
  { id: 5, label: "Section 4/4: Contact Terminal" },
];
