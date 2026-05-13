import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import Scene from "./_components/canvas/Scene";
import HudContainer from "./_components/hud/HudContainer";
import { ModalProvider } from "./_context/ModalContext";
import "./_styles/globals.css";

export const metadata: Metadata = {
  title: "James McEvoy's Portfolio",
  description: "James McEvoy's portfolio built with Next.js and Three.js",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${sourceSans.variable}`}>
      <body className="bg-black text-white antialiased pointer-events-auto">
        <ModalProvider>
          <div className="fixed inset-0 z-0">
            <Scene />
          </div>

          {/* HUD */}
          <HudContainer />
        </ModalProvider>

        <main
          id="root"
          className="relative z-10 min-h-screen pointer-events-none"
        >
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
