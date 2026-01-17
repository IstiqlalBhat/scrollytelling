"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PizzaScroll from "./components/PizzaScroll";
import StoryOverlay from "./components/StoryOverlay";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Scrollytelling Section - contained experience */}
      <section className="relative h-[650vh]">
        <PizzaScroll />
        <StoryOverlay />
      </section>

    </>
  );
}
