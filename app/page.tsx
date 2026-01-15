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
      <section className="relative h-[500vh]">
        <PizzaScroll />
        <StoryOverlay />
      </section>

      {/* Footer - Clear end of experience */}
      <footer className="relative z-30 flex min-h-screen flex-col items-center justify-center bg-[#1a1a1a] px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 leading-tight">
          Ready to Experience<br />Wood-Fired Magic?
        </h2>
        <p className="mt-4 sm:mt-6 max-w-sm sm:max-w-md text-base sm:text-lg text-neutral-400 leading-relaxed">
          Visit Full Circle Cafe and taste the passion behind every slice.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <a href="https://fullcirclecafes.com/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-orange-600 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:bg-orange-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 active:scale-95 text-center">
            Order Online
          </a>
          <button className="rounded-full border border-neutral-600 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-neutral-200 transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-800 active:scale-95">
            Find a Location
          </button>
        </div>
        <p className="mt-16 sm:mt-20 text-xs sm:text-sm text-neutral-600">
          © 2026 Full Circle Cafe. All rights reserved.
        </p>
      </footer>
    </>
  );
}
