"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 192;

export default function PizzaScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll();

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

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

    // Render a specific frame
    useEffect(() => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = (index: number) => {
            const img = images[index];
            if (!img) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

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

        render(0);

        const handleResize = () => render(Math.round(currentIndex.get()));
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, images]);

    // Update on scroll
    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const index = Math.round(latest);
        const img = images[index];
        if (!img) return;

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
