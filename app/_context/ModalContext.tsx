"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import TechnologyStackIcons from "../_components/projects/TechnologyStackIcons";
import { projectData } from "../_lib/data";

export type ModalName =
  | "the-pond"
  | "cobalt-aluminium"
  | "cobalt-construction"
  | "cobalt-hub"
  | "cobalt-development"
  | "smiling-sole-reflexology";

type ArbitraryProps = Record<string, unknown>;

export interface modalState {
  name: ModalName | null;
  props: ArbitraryProps;
}

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
}

// This type is for what the context providers the children.
interface modalContextType {
  openModal: (name: ModalName) => void;
  closeModal: () => void;
  modalState: modalState;
}

interface modalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<modalContextType | undefined>(undefined);

function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const windowHeight = window.innerHeight;

  return createPortal(
    // Backdrop
    <>
      <motion.div
        id="modal"
        className="fixed inset-0 w-full h-100dvh flex justify-center backdrop-blur-[2px] z-50"
        onClick={onClose}
        onWheel={(e) => e.stopPropagation()}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Card */}
        <div className="min-h-[calc(100%)] w-full overflow-y-scroll flex justify-center">
          <motion.div
            className="bg-linear-to-bl from-[#212121] to-[#1d1d1d] max-w-341.5 lg:w-4/5 my-16 can-scroll rounded-4xl h-fit"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, y: windowHeight }}
            animate={{ scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: windowHeight }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Content Area */}
            <div className="overflow-y-scroll px-6 lg:px-40 mt-20 lg:mt-30 flex flex-col gap-80 lg:gap-100 justify-center text-center">
              {children}
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={onClose}
          className="fixed bottom-10 lg:bottom-auto lg:top-10 lg:right-10 cursor-pointer z-60 flex items-center justify-center w-10 h-10 rounded-full border border-light/10 bg-light/5 backdrop-blur-sm hover:border-light/40 duration-200 hover:scale-110 active:scale-95"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 1.2, 1], opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="relative w-6 h-6">
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-light rotate-45 rounded-full" />
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-light -rotate-45 rounded-full" />
          </div>
        </motion.button>
      </motion.div>
    </>,

    document.body,
  );
}

function ThePondModal() {
  const { closeModal } = useModal();

  const {
    title,
    description,
    heroImg,
    liveUrl,
    logos,
    firstImg,
    secondImg,
    thirdImg,
    brandColor,
  } = projectData.filter((pro) => pro.id === 1)[0];

  return (
    <>
      {/* Title area */}
      <div>
        <h2>{title}</h2>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-grey animate-pulse hover:text-accent duration-200"
        >
          [ LIVE SITE ]
        </Link>
        <img
          src={heroImg}
          alt="The applications homepage shown on mobile, tablet, and desktop."
          className="max-w-240 w-full mx-auto mt-10 mb-6"
        />
        <p className="max-w-200 mx-auto">{description}</p>
      </div>

      {/* Technology stack */}
      <div>
        <h3>THE TECHNOLOGY STACK:</h3>
        <div className="my-6 flex flex-wrap justify-center items-center gap-10">
          <TechnologyStackIcons logos={logos} />
        </div>
        <p className="max-w-200 mx-auto">
          Next.js and TypeScript, are the foundation of the app; while Framer
          Motion and Tailwind CSS bring the overall aesthetic. ApexCharts
          displays the users statistics through graphs, with Supabase handling
          those stats using SQL, Cruds, and the applications tables.
        </p>
      </div>

      {/* Core features */}
      <div>
        <h3>THE WEBSITES CORE FEATURES:</h3>
        <div className="mt-6 flex flex-col gap-20 text-left">
          {/* First section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={firstImg}
              alt="Desktop and laptop view of the apps dashboard."
              className="w-full lg:w-4/5 max-w-[666px]"
            />
            <div className="w-fit max-w-120 lg:max-w-max lg:w-75 shrink-0">
              <p className="mb-6">
                When users first enter the app, the first thing they see is the
                their dashboard, which features their:
              </p>
              <ul className="list-disc ml-5.5">
                <li>Progression</li>
                <li>Next milestone</li>
                <li>Most recent posts</li>
                <li>Daily habit checklists</li>
                <li>Habit streak comparison&nbsp;graph</li>
              </ul>
            </div>
          </div>
          {/* Second section */}
          <div className="flex-col gap-6 flex lg:flex-row-reverse lg:gap-20 items-center justify-center">
            <img
              src={secondImg}
              alt="Laptop and mobile view of the edit a post, and new habit modals."
              className="w-full lg:w-4/5 max-w-[600px]"
            />
            <p className="text-right w-fit max-w-120 lg:max-w-max lg:min-w-77.5">
              Users can create habits, posts and edit content through various
              modals.
              <br />
              <br />
              While data is handled via Supabase and TanStack Query. By
              invalidating queries and fetching new data, the app provides
              immediate feedback to users without the page reloading.
            </p>
          </div>
          {/* Third section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={thirdImg}
              alt="Tablet and mobile view of the explore page displaying users milestone posts."
              className="w-full lg:w-4/5 max-w-[404px]"
            />
            <div className="w-fit max-w-120 lg:max-w-max lg:min-w-85">
              <p className="mb-6">
                The explore page is where all of the users posts get shown.
              </p>
              <p>Each posts consists of the following:</p>
              <ul className="list-disc ml-5.5">
                <li>Their milestone streak</li>
                <li>Title & description</li>
                <li>Comments & likes</li>
                <li>A comment modal to interact with the post</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What I've learnt */}
      <div className="h-[calc(100dvh-80px)] flex justify-center items-center flex-col">
        <h3>WHAT I&apos;VE LEARNT:</h3>
        <p className="max-w-200 mx-auto mt-6 pb-10">
          This project pushed my development forward. I explored how a backend
          interacts across relational tables, handled complex data caching, and
          implemented Google Auth. I also got to strengthen my understanding of
          the React component tree and state management.
          <br />
          <br />
          The work was difficult, but I succeeded in combining these features
          into a functional application. I am looking forward to my next steps.
        </p>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          className="font-medium px-6 py-4 border border-light rounded-full hover:bg-light duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the project
        </Link>
      </div>
    </>
  );
}

function SmilingSoleReflexologyModal() {
  const { closeModal } = useModal();

  const {
    title,
    description,
    heroImg,
    liveUrl,
    logos,
    firstImg,
    secondImg,
    thirdImg,
  } = projectData.filter((pro) => pro.id === 2)[0];

  return (
    <>
      {/* Title area */}
      <div>
        <h2>{title}</h2>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-grey animate-pulse hover:text-accent duration-200"
        >
          [ LIVE SITE ]
        </Link>
        <img
          src={heroImg}
          alt="The applications homepage shown on mobile, tablet, and desktop."
          className="max-w-240 w-full mx-auto mt-10 mb-6"
        />
        <p className="max-w-200 mx-auto">{description}</p>
      </div>

      {/* Technology stack */}
      <div>
        <h3>THE TECHNOLOGY STACK:</h3>
        <div className="my-6 flex flex-wrap justify-center items-center gap-10">
          <TechnologyStackIcons logos={logos} />
        </div>
        <p className="max-w-200 mx-auto">
          Built with Next.js, and utilising its middleware; we protect the
          employee only dashboard which fetches data from Supabase which stores
          all client inquiries. Framer motion and Tailwind CSS support
          animations across the site, as well as the general aesthetic.
        </p>
      </div>

      {/* Core features */}
      <div>
        <h3>THE WEBSITES CORE FEATURES:</h3>
        <div className="mt-6 flex flex-col gap-20 text-left">
          {/* First section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={firstImg}
              alt="Desktop and laptop view of the websites employee only dashboard."
              className="w-full lg:w-4/5 max-w-[666px]"
            />
            <p className="w-fit max-w-120 lg:max-w-max lg:w-75 shrink-0">
              The dashboard is my favourite feature of the website, perhaps
              because it was my first time creating one.
              <br />
              <br />
              The dashboard lists the inquiries, whether they&apos;ve been seen
              to.
              <br />
              <br />
              Opening an inquiry lets you see the forms submission.
            </p>
          </div>
          {/* Second section */}
          <div className="flex-col gap-6 flex lg:flex-row-reverse lg:gap-20 items-center justify-center">
            <img
              src={secondImg}
              alt="Laptop and mobile view of the treatment lists."
              className="w-full lg:w-4/5 max-w-[600px]"
            />
            <p className="text-right w-fit max-w-120 lg:max-w-max lg:min-w-77.5">
              One of the core features that the client requested was to feature
              all of the treatments they provide.
              <br />
              <br />
              Framer motion and Reacts useState hook have been used here to
              manage the toggled expand state.
            </p>
          </div>
          {/* Third section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={thirdImg}
              alt="Tablet and mobile view of the contact form."
              className="w-full lg:w-4/5 max-w-[404px]"
            />
            <p className="w-fit max-w-120 lg:max-w-max lg:min-w-85">
              The form was built with React Hook Form, and reCAPTCHA to prevent
              spam.
              <br />
              <br />
              When a user submits an inquiry, they are sent to a thank you page
              using useRouter from Next.js. Alongside the redirect, the form
              data is sent to Supabase. Additionally EmailJS sends an email to
              the business informing them of the form submission.
            </p>
          </div>
        </div>
      </div>

      {/* What I've learnt */}
      <div className="h-[calc(100dvh-80px)] flex justify-center items-center flex-col">
        <h3>WHAT I&apos;VE LEARNT:</h3>
        <p className="max-w-200 mx-auto mt-6 pb-10">
          This was my first time creating a project that integrated the
          front-end and back-end. There were a few hiccups integrating Supabase
          Auth with Next.js Middleware, but the documentation was clear and
          concise, which resolved any issues quickly.
        </p>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          className="font-medium px-6 py-4 border border-light rounded-full hover:bg-light duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the project
        </Link>
      </div>
    </>
  );
}

function CobaltDevelopmentModal() {
  const { closeModal } = useModal();

  const {
    title,
    description,
    heroImg,
    liveUrl,
    logos,
    firstImg,
    secondImg,
    thirdImg,
  } = projectData.filter((pro) => pro.id === 3)[0];

  return (
    <>
      {/* Title area */}
      <div>
        <h2>{title}</h2>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-grey animate-pulse hover:text-accent duration-200"
        >
          [ LIVE SITE ]
        </Link>
        <img
          src={heroImg}
          alt="The applications homepage shown on mobile, tablet, and desktop."
          className="max-w-240 w-full mx-auto mt-10 mb-6"
        />
        <p className="max-w-200 mx-auto">{description}</p>
      </div>

      {/* Technology stack */}
      <div>
        <h3>THE TECHNOLOGY STACK:</h3>
        <div className="my-6 flex flex-wrap justify-center items-center gap-10">
          <TechnologyStackIcons logos={logos} />
        </div>
        <p className="max-w-200 mx-auto">
          Next.js is the framework used for this website, with Tailwind CSS and
          Framer Motion handling the animation and aesthetic.
        </p>
      </div>

      {/* Core features */}
      <div>
        <h3>THE WEBSITES CORE FEATURES:</h3>
        <div className="mt-6 flex flex-col gap-20 text-left">
          {/* First section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={firstImg}
              alt="Desktop and laptop view of the apps dashboard."
              className="w-full lg:w-4/5 max-w-[666px]"
            />
            <p className="w-fit max-w-120 lg:max-w-max lg:w-75 shrink-0">
              The main feature of this website is to advertise their development
              projects which are featured on their other website Cobalt
              Construction.
              <br />
              <br />
              The cards feature a PDF brochure in the top right, and the link to
              the respected project on Cobalt Construction.
            </p>
          </div>
          {/* Second section */}
          <div className="flex-col gap-6 flex lg:flex-row-reverse lg:gap-20 items-center justify-center">
            <img
              src={secondImg}
              alt="Laptop and mobile view of the edit a post, and new habit modals."
              className="w-full lg:w-4/5 max-w-[600px]"
            />
            <p className="text-right w-fit max-w-120 lg:max-w-max lg:min-w-77.5">
              The section uses a standard HTML form secured by reCAPTCHA. Upon
              form submission, the data is sent to Formspree for the client to
              access.
            </p>
          </div>
        </div>
      </div>

      {/* What I've learnt */}
      <div className="h-[calc(100dvh-80px)] flex justify-center items-center flex-col">
        <h3>WHAT I&apos;VE LEARNT:</h3>
        <p className="max-w-200 mx-auto mt-6 pb-10">
          There is one main thing I learnt from this project, and that was
          Next.js SSG (static site generation). This website didn&apos;t need to
          fetch any external data, so it was never much of a concern; however,
          when running `npm run build`, I had to ensure the export was set up
          correctly for the clients folder structure.
        </p>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          className="font-medium px-6 py-4 border border-light rounded-full hover:bg-light duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the project
        </Link>
      </div>
    </>
  );
}

function CobaltConstructionModal() {
  const { closeModal } = useModal();

  const {
    title,
    description,
    heroImg,
    liveUrl,
    logos,
    firstImg,
    secondImg,
    thirdImg,
  } = projectData.filter((pro) => pro.id === 4)[0];

  return (
    <>
      {/* Title area */}
      <div>
        <h2>{title}</h2>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-grey animate-pulse hover:text-accent duration-200"
        >
          [ LIVE SITE ]
        </Link>
        <img
          src={heroImg}
          alt="The applications homepage shown on mobile, tablet, and desktop."
          className="max-w-240 w-full mx-auto mt-10 mb-6"
        />
        <p className="max-w-200 mx-auto">{description}</p>
      </div>

      {/* Technology stack */}
      <div>
        <h3>THE TECHNOLOGY STACK:</h3>
        <div className="my-6 flex flex-wrap justify-center items-center gap-10">
          <TechnologyStackIcons logos={logos} />
        </div>
        <p className="max-w-200 mx-auto">
          This website is built using standard HTML, CSS, and JavaScript.
        </p>
      </div>

      {/* Core features */}
      <div>
        <h3>THE WEBSITES CORE FEATURES:</h3>
        <div className="mt-6 flex flex-col gap-20 text-left">
          {/* First section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={firstImg}
              alt="Desktop and laptop view of the apps dashboard."
              className="w-full lg:w-4/5 max-w-[666px]"
            />
            <p className="w-fit max-w-120 lg:max-w-max lg:w-75 shrink-0">
              Projects are displayed by applying the active classes to map pins
              showing where the project was located.
              <br />
              <br />
              Each map pin is linked to their corresponding project on the
              project page.
            </p>
          </div>
          {/* Second section */}
          <div className="flex-col gap-6 flex lg:flex-row-reverse lg:gap-20 items-center justify-center">
            <img
              src={secondImg}
              alt="Laptop and mobile view of the edit a post, and new habit modals."
              className="w-full lg:w-4/5 max-w-[600px]"
            />
            <p className="text-right w-fit max-w-120 lg:max-w-max lg:min-w-77.5">
              The projects page features projects listed in
              chronological&nbsp;order.
              <br />
              <br />
              Each project card has its own image carousel, with tags showing
              whether it was a residential or commercial build.
            </p>
          </div>
        </div>
      </div>

      {/* What I've learnt */}
      <div className="h-[calc(100dvh-80px)] flex justify-center items-center flex-col">
        <h3>WHAT I&apos;VE LEARNT:</h3>
        <p className="max-w-200 mx-auto mt-6 pb-10">
          This project was great for practising standard CSS. Aside from that,
          there wasn&apos;t much needed to be learnt.
        </p>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          className="font-medium px-6 py-4 border border-light rounded-full hover:bg-light duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the project
        </Link>
      </div>
    </>
  );
}

function CobaltHubModal() {
  const { closeModal } = useModal();

  const {
    title,
    description,
    heroImg,
    liveUrl,
    logos,
    firstImg,
    secondImg,
    thirdImg,
  } = projectData.filter((pro) => pro.id === 5)[0];

  return (
    <>
      {/* Title area */}
      <div>
        <h2>{title}</h2>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-grey animate-pulse hover:text-accent duration-200"
        >
          [ LIVE SITE ]
        </Link>
        <img
          src={heroImg}
          alt="The applications homepage shown on mobile, tablet, and desktop."
          className="max-w-240 w-full mx-auto mt-10 mb-6"
        />
        <p className="max-w-200 mx-auto">{description}</p>
      </div>

      {/* Technology stack */}
      <div>
        <h3>THE TECHNOLOGY STACK:</h3>
        <div className="my-6 flex flex-wrap justify-center items-center gap-10">
          <TechnologyStackIcons logos={logos} />
        </div>
        <p className="max-w-200 mx-auto">
          This website is built using standard HTML, CSS, and JavaScript.
        </p>
      </div>

      {/* Core features */}
      <div>
        <h3>THE WEBSITES CORE FEATURES:</h3>
        <div className="mt-6 flex flex-col gap-20 text-left">
          {/* First section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={firstImg}
              alt="Desktop and laptop view of the apps dashboard."
              className="w-full lg:w-4/5 max-w-[666px]"
            />
            <p className="w-fit max-w-120 lg:max-w-max lg:w-75 shrink-0">
              The lesson from this project isn&apos;t what you&apos;d think. It
              actually comes from handling the hosting platform Hosting. It was
              my first time using subdomains, and having to correctly manage the
              websites folder structure.
            </p>
          </div>
        </div>
      </div>

      {/* What I've learnt */}
      <div className="h-[calc(100dvh-80px)] flex justify-center items-center flex-col">
        <h3>WHAT I&apos;VE LEARNT:</h3>
        <p className="max-w-200 mx-auto mt-6 pb-10">
          This project was great for practising standard CSS. Aside from that,
          there wasn&apos;t much needed to be learnt.
        </p>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          className="font-medium px-6 py-4 border border-light rounded-full hover:bg-light duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the project
        </Link>
      </div>
    </>
  );
}

function CobaltAluminiumModal() {
  const { closeModal } = useModal();

  const {
    title,
    description,
    heroImg,
    liveUrl,
    logos,
    firstImg,
    secondImg,
    thirdImg,
  } = projectData.filter((pro) => pro.id === 6)[0];

  return (
    <>
      {/* Title area */}
      <div>
        <h2>{title}</h2>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-grey animate-pulse hover:text-accent duration-200"
        >
          [ LIVE SITE ]
        </Link>
        <img
          src={heroImg}
          alt="The applications homepage shown on mobile, tablet, and desktop."
          className="max-w-240 w-full mx-auto mt-10 mb-6"
        />
        <p className="max-w-200 mx-auto">{description}</p>
      </div>

      {/* Technology stack */}
      <div>
        <h3>THE TECHNOLOGY STACK:</h3>
        <div className="my-6 flex flex-wrap justify-center items-center gap-10">
          {logos.map((logo) => (
            <img key={logo} src={logo} alt="SVG of web technology." />
          ))}
        </div>
        <p className="max-w-200 mx-auto">
          This website is built using standard HTML, CSS, and JavaScript.
        </p>
      </div>

      {/* Core features */}
      <div>
        <h3>THE WEBSITES CORE FEATURES:</h3>
        <div className="mt-6 flex flex-col gap-20 text-left">
          {/* First section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={firstImg}
              alt="Desktop and laptop view of the apps dashboard."
              className="w-full lg:w-4/5 max-w-[666px]"
            />
            <p className="w-fit max-w-120 lg:max-w-max lg:w-75 shrink-0">
              The website contains two rows. One for doors & windows, and the
              other their accessories.
              <br />
              <br />
              Each card contains a link to the products page, and a tag of
              whether it is a window or door.
              <br />
              <br />
              Below the carousel, a custom scrollbar can be found, made from
              pure JavaScript
            </p>
          </div>
          {/* Second section */}
          <div className="flex-col gap-6 flex lg:flex-row-reverse lg:gap-20 items-center justify-center text-right">
            <img
              src={secondImg}
              alt="Tablet and mobile view of the explore page displaying users milestone posts."
              className="w-full lg:w-4/5 max-w-[404px]"
            />

            <p className="text-right w-fit max-w-120 lg:max-w-max lg:min-w-77.5">
              The section uses a standard HTML form secured by reCAPTCHA. Upon
              form submission, the data is sent to Formspree for the client to
              access.
            </p>
          </div>
          {/* Third section */}
          <div className="flex-col gap-6 flex lg:flex-row lg:gap-20 items-center justify-center">
            <img
              src={thirdImg}
              alt="Laptop and mobile view of the edit a post, and new habit modals."
              className="w-full lg:w-4/5 max-w-[600px]"
            />
            <div className="w-fit max-w-120 lg:max-w-max lg:min-w-85">
              <p className="mb-6">
                The individual product page features the following:
              </p>
              <ul className="list-disc ml-5.5">
                <li>Product images</li>
                <li>Colour renders</li>
                <li>Product descriptions</li>
                <li>Technical details modal</li>
                <li>Specification animated slider</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What I've learnt */}
      <div className="h-[calc(100dvh-80px)] flex justify-center items-center flex-col">
        <h3>WHAT I&apos;VE LEARNT:</h3>
        <p className="max-w-200 mx-auto mt-6 pb-10">
          As this was my first project, there was a lot to learn. The one I like
          to look back and laugh at is that every product is its own HTML page.
          It makes me really wish that I knew React.js back when I was building
          it.
          <br />
          <br />
          My second criticism to myself is that scaling down icons and font for
          the contact form would have made it look a lot cleaner. There are a
          few more things, but I’ll leave it up to you to spot them.
        </p>
        <Link
          href={liveUrl}
          aria-label="A button to the actual projects live site."
          className="font-medium px-6 py-4 border border-light rounded-full hover:bg-light duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the project
        </Link>
      </div>
    </>
  );
}

// Provider that wraps around app and provides the open and close modal funcs.
function ModalProvider({ children }: modalProviderProps) {
  const [modalState, setModalState] = useState<modalState>({
    name: null,
    props: {},
  });

  const openModal = (name: ModalName, props: ArbitraryProps = {}) => {
    setModalState({ name: name, props: props });
  };

  function closeModal() {
    setModalState({ name: null, props: {} });
  }

  useEffect(() => {
    if (modalState.name) {
      // Stop the body from scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Allow the body to scroll again
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [modalState.name]);

  const modalComponents = {
    "the-pond": ThePondModal,
    "cobalt-aluminium": CobaltAluminiumModal,
    "cobalt-construction": CobaltConstructionModal,
    "cobalt-hub": CobaltHubModal,
    "cobalt-development": CobaltDevelopmentModal,
    "smiling-sole-reflexology": SmilingSoleReflexologyModal,
  };

  const ModalComponent = modalState.name
    ? modalComponents[modalState.name]
    : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalState }}>
      {children}
      <AnimatePresence>
        {modalState.name && ModalComponent && (
          <ModalWrapper onClose={closeModal}>
            <ModalComponent {...modalState.props} />
          </ModalWrapper>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

// Check for if context is being used wrong.
function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("ModalContext was used outside ModalProvider");
  return context;
}

export { ModalProvider, useModal };
