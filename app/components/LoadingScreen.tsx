"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
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
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#1a1a1a]"
        >
            {/* Logo/Brand */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
                Istiqlal Café
            </motion.h1>

            {/* Pizza Slice Dots */}
            <div className="flex items-center gap-4">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                        }}
                        className="text-4xl"
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Pizza slice shape */}
                            <path
                                d="M12 2L2 22h20L12 2z"
                                fill="#f97316"
                                stroke="#ea580c"
                                strokeWidth="1"
                            />
                            {/* Cheese/topping details */}
                            <circle cx="10" cy="14" r="1.5" fill="#fbbf24" />
                            <circle cx="14" cy="16" r="1.5" fill="#ef4444" />
                            <circle cx="12" cy="11" r="1.2" fill="#22c55e" />
                            {/* Crust */}
                            <path
                                d="M4 20h16"
                                stroke="#d97706"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                    className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Loading text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-sm tracking-widest text-neutral-500"
            >
                PREPARING YOUR EXPERIENCE
            </motion.p>
        </motion.div>
    );
}
