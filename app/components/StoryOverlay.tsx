"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function StoryOverlay() {
    const { scrollYProgress } = useScroll();

    // Opacity transforms for each section
    // 0% -> Block 1
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // 30% -> Block 2
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.2, 0.3], [-50, 0]);

    // 60% -> Block 3
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.5, 0.6], [50, 0]);

    // 90% -> Block 4
    const opacity4 = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
    const scale4 = useTransform(scrollYProgress, [0.8, 1], [0.9, 1]);

    return (
        <div className="pointer-events-none fixed inset-0 z-20 flex h-screen w-full flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20">

            {/* Section 1: 0% - Hero */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex items-center justify-center text-center px-4"
            >
                <h1
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
                    style={{
                        textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)"
                    }}
                >
                    Wood-Fired<br />Perfection.
                </h1>
            </motion.div>

            {/* Section 2: 30% - Left aligned */}
            <motion.div
                style={{ opacity: opacity2, x: x2 }}
                className="absolute left-0 flex h-full w-full items-center justify-start px-6 sm:px-10 md:px-16 lg:px-32"
            >
                <div className="max-w-xs sm:max-w-sm md:max-w-lg">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white"
                        style={{
                            textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)"
                        }}
                    >
                        Handcrafted Daily.
                    </h2>
                    <p
                        className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed"
                        style={{
                            textShadow: "0 2px 15px rgba(0,0,0,0.9)"
                        }}
                    >
                        Dough fermented for 48 hours. San Marzano tomatoes.
                        Passion in every slice.
                    </p>
                </div>
            </motion.div>

            {/* Section 3: 60% - Right aligned */}
            <motion.div
                style={{ opacity: opacity3, x: x3 }}
                className="absolute right-0 flex h-full w-full items-center justify-end px-6 sm:px-10 md:px-16 lg:px-32"
            >
                <div className="max-w-xs sm:max-w-sm md:max-w-lg text-right">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white"
                        style={{
                            textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)"
                        }}
                    >
                        Premium Ingredients.
                    </h2>
                    <p
                        className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed"
                        style={{
                            textShadow: "0 2px 15px rgba(0,0,0,0.9)"
                        }}
                    >
                        Locally sourced mozzarella. Fresh basil.
                        Olive oil from the source.
                    </p>
                </div>
            </motion.div>

            {/* Section 4: 90% - CTA */}
            <motion.div
                style={{ opacity: opacity4, scale: scale4 }}
                className="absolute inset-0 flex items-center justify-center text-center px-4"
            >
                <div className="flex flex-col items-center">
                    <h2
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white"
                        style={{
                            textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)"
                        }}
                    >
                        Taste the Difference.
                    </h2>
                    <a href="https://fullcirclecafes.com/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto mt-6 sm:mt-8 rounded-full bg-orange-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-orange-600/30 transition-all duration-300 hover:bg-orange-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95">
                        Order Now
                    </a>
                </div>
            </motion.div>

        </div>
    );
}
