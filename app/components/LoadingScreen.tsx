"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onLoadComplete(), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [onLoadComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: "linear-gradient(165deg, #FDF8F3 0%, #FEF6EE 40%, #F5EDE4 100%)",
            }}
        >
            {/* Subtle grain texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Decorative corner flourishes */}
            <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l-2 border-t-2 border-[#D4A574]/30" />
            <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 border-r-2 border-t-2 border-[#D4A574]/30" />
            <div className="pointer-events-none absolute bottom-8 left-8 h-16 w-16 border-b-2 border-l-2 border-[#D4A574]/30" />
            <div className="pointer-events-none absolute bottom-8 right-8 h-16 w-16 border-b-2 border-r-2 border-[#D4A574]/30" />

            {/* Logo/Brand with elegant serif */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 text-center"
            >
                <h1 className="font-display text-4xl font-medium tracking-wide text-[#2D2420] sm:text-5xl md:text-6xl">
                    Full Circle
                </h1>
                <p className="font-display mt-1 text-lg tracking-[0.3em] text-[#C75D3A] sm:text-xl">
                    CAFE
                </p>
            </motion.div>

            {/* Elegant pizza slice animation */}
            <div className="flex items-center gap-5">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{
                            scale: [1, 1.15, 1],
                            rotate: [0, 8, -8, 0],
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.25,
                            ease: "easeInOut",
                        }}
                    >
                        <svg
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ filter: "drop-shadow(0 4px 8px rgba(199, 93, 58, 0.2))" }}
                        >
                            {/* Pizza slice with warmer colors */}
                            <path
                                d="M12 2L2 22h20L12 2z"
                                fill="#C75D3A"
                                stroke="#A84D2E"
                                strokeWidth="0.5"
                            />
                            {/* Cheese highlights */}
                            <circle cx="10" cy="14" r="1.5" fill="#D4A574" />
                            <circle cx="14" cy="16" r="1.5" fill="#E5C9A8" />
                            <circle cx="12" cy="11" r="1.2" fill="#8B9A7D" />
                            {/* Golden crust */}
                            <path
                                d="M4 20h16"
                                stroke="#D4A574"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Refined progress bar */}
            <div className="relative mt-12 h-[3px] w-56 overflow-hidden rounded-full bg-[#F5EDE4]">
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        background: "linear-gradient(90deg, #C75D3A, #D4A574)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
            </div>

            {/* Elegant loading text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-body mt-6 text-xs font-medium tracking-[0.25em] text-[#8B9A7D]"
            >
                PREPARING YOUR EXPERIENCE
            </motion.p>
        </motion.div>
    );
}
