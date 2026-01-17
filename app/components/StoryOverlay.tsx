"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function StoryOverlay() {
    const { scrollYProgress } = useScroll();

    // Match physics of PizzaScroll for synchronization
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    });

    // Opacity transforms for each section
    const opacity1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(smoothProgress, [0, 0.2], [0, -50]);

    const opacity2 = useTransform(smoothProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const x2 = useTransform(smoothProgress, [0.2, 0.3], [-50, 0]);

    const opacity3 = useTransform(smoothProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const x3 = useTransform(smoothProgress, [0.5, 0.6], [50, 0]);

    const opacity4 = useTransform(smoothProgress, [0.8, 0.9, 1], [0, 1, 1]);
    const scale4 = useTransform(smoothProgress, [0.8, 1], [0.9, 1]);

    return (
        <div className="pointer-events-none fixed inset-0 z-20 flex w-full flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20">

            {/* Section 1: Hero */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex items-center justify-center px-4 text-center"
            >
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="font-body mb-6 inline-block rounded-full border border-white/20 bg-[#FDF8F3]/80 px-5 py-2 text-sm font-semibold tracking-[0.3em] text-[#2D2420] backdrop-blur-sm sm:px-6 sm:py-2.5 sm:text-base"
                    >
                        FULL CIRCLE CAFE
                    </motion.p>
                    <h1
                        className="font-display text-5xl font-medium italic leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
                        style={{
                            textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.4)"
                        }}
                    >
                        Wood-Fired<br />
                        <span className="not-italic">Perfection.</span>
                    </h1>
                </div>
            </motion.div>

            {/* Section 2: Left aligned */}
            <motion.div
                style={{ opacity: opacity2, x: x2 }}
                className="absolute left-0 flex h-full w-full items-center justify-start px-6 sm:px-10 md:px-16 lg:px-32"
            >
                <div className="max-w-xs sm:max-w-sm md:max-w-lg">
                    {/* Decorative line */}
                    <div className="mb-6 h-[2px] w-16 bg-gradient-to-r from-[#D4A574] to-transparent" />
                    <h2
                        className="font-display text-3xl font-medium italic text-white sm:text-4xl md:text-5xl lg:text-6xl"
                        style={{
                            textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.4)"
                        }}
                    >
                        Handcrafted Daily.
                    </h2>
                    <p
                        className="font-body mt-4 text-base font-normal leading-relaxed text-white/90 sm:mt-5 sm:text-lg md:text-xl"
                        style={{
                            textShadow: "0 2px 12px rgba(0,0,0,0.7)"
                        }}
                    >
                        Dough fermented for 48 hours. San Marzano tomatoes.
                        Passion in every slice.
                    </p>
                </div>
            </motion.div>

            {/* Section 3: Right aligned */}
            <motion.div
                style={{ opacity: opacity3, x: x3 }}
                className="absolute right-0 flex h-full w-full items-center justify-end px-6 sm:px-10 md:px-16 lg:px-32"
            >
                <div className="max-w-xs text-right sm:max-w-sm md:max-w-lg">
                    {/* Decorative line */}
                    <div className="mb-6 ml-auto h-[2px] w-16 bg-gradient-to-l from-[#D4A574] to-transparent" />
                    <h2
                        className="font-display text-3xl font-medium italic text-white sm:text-4xl md:text-5xl lg:text-6xl"
                        style={{
                            textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.4)"
                        }}
                    >
                        Premium Ingredients.
                    </h2>
                    <p
                        className="font-body mt-4 text-base font-normal leading-relaxed text-white/90 sm:mt-5 sm:text-lg md:text-xl"
                        style={{
                            textShadow: "0 2px 12px rgba(0,0,0,0.7)"
                        }}
                    >
                        Locally sourced mozzarella. Fresh basil.
                        Olive oil from the source.
                    </p>
                </div>
            </motion.div>

            {/* Section 4: CTA */}
            <motion.div
                style={{ opacity: opacity4, scale: scale4 }}
                className="absolute inset-0 flex items-center justify-center px-4 text-center"
            >
                <div className="flex flex-col items-center">
                    <p
                        className="font-body mb-6 inline-block rounded-full border border-white/20 bg-[#FDF8F3]/80 px-5 py-2 text-sm font-semibold tracking-[0.25em] text-[#2D2420] backdrop-blur-sm sm:px-6 sm:py-2.5 sm:text-base"
                    >
                        EXPERIENCE THE DIFFERENCE
                    </p>
                    <h2
                        className="font-display text-4xl font-medium italic text-white sm:text-5xl md:text-7xl lg:text-8xl"
                        style={{
                            textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.4)"
                        }}
                    >
                        Taste the Craft.
                    </h2>

                    {/* Elegant CTA Button */}
                    <a
                        href="https://fullcirclecafes.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto group relative mt-10 overflow-hidden sm:mt-12"
                    >
                        {/* Button glow effect */}
                        <span
                            className="absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
                            style={{
                                background: "linear-gradient(135deg, #C75D3A, #D4A574)",
                            }}
                        />

                        {/* Main button */}
                        <span
                            className="font-body relative flex items-center gap-3 rounded-full border-2 border-white/20 bg-[#C75D3A] px-8 py-4 text-base font-semibold tracking-wide text-white transition-all duration-300 group-hover:border-[#D4A574]/50 group-hover:bg-[#A84D2E] sm:px-10 sm:py-5 sm:text-lg"
                            style={{
                                boxShadow: "0 4px 20px rgba(199, 93, 58, 0.4), 0 8px 40px rgba(0,0,0,0.3)",
                            }}
                        >
                            Order Now
                            {/* Arrow icon */}
                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </a>
                </div>
            </motion.div>

        </div>
    );
}
