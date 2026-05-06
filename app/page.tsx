"use client";

import Terminal from "./_components/form/Terminal";
import Hero from "./_components/page/Hero";
import Skills from "./_components/page/Skills";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />
      {/* Track */}
      {/* Final Screen: Footer or Contact */}

      <div className="h-[800vh] w-full pointer-events-none" />

      {/* Skills */}
      <Skills />

      <Terminal />
    </>
  );
}
