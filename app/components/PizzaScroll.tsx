"use client";

import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 192;

export default function PizzaScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll();

    // "Buttery" smooth physics
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    });

    const currentIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    const lastRenderedIndex = useRef<number>(-1);

    // Load all images
    useEffect(() => {
        const imageArray: HTMLImageElement[] = new Array(FRAME_COUNT);
        let loadedCount = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const paddedIndex = (i + 1).toString().padStart(3, "0");

            img.onload = () => {
                imageArray[i] = img;
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImages([...imageArray]);
                }
            };

            img.onerror = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImages([...imageArray]);
                }
            };

            img.src = `/images/ezgif-frame-${paddedIndex}.jpg`;
        }
    }, []);

    const imagesLoaded = images.length === FRAME_COUNT;

    // Helper to draw a specific frame
    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const img = images[index];
        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Optimization: Don't set width/height here! 
        // It clears the canvas and is expensive.

        ctx.fillStyle = "#2D2420";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Use "cover" mode - fill screen, crop if needed
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = img.height * (canvas.width / img.width);
        } else {
            drawHeight = canvas.height;
            drawWidth = img.width * (canvas.height / img.height);
        }

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Handle Resize separately
    useEffect(() => {
        if (!imagesLoaded) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Force redraw after resize
            const index = Math.round(currentIndex.get());
            drawFrame(index);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [imagesLoaded, images]); // Re-run when images verify loaded

    // Initial draw
    useEffect(() => {
        if (imagesLoaded) {
            drawFrame(0);
        }
    }, [imagesLoaded]);

    // Update on scroll with optimization
    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (!imagesLoaded) return;

        const index = Math.round(latest);

        // Optimization: Only draw if frame changed
        if (index === lastRenderedIndex.current) return;

        drawFrame(index);
        lastRenderedIndex.current = index;
    });

    return (
        <div className="fixed inset-0 z-0 h-screen w-full bg-[#2D2420]">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block"
                style={{ width: "100%", height: "100%" }}
            />
            {/* Subtle vignette for edge blending */}
            {imagesLoaded && (
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 150% 150% at 50% 50%, transparent 50%, rgba(45, 36, 32, 0.75) 100%)"
                    }}
                />
            )}
        </div>
    );
}
