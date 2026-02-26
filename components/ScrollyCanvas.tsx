'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 191;

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const currentFrameRef = useRef(0);

    // Scope scroll to the 500vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Preload all images
    useEffect(() => {
        let loaded = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const idx = i.toString().padStart(3, '0');
            img.src = `/sequence/frame_${idx}.png`;
            img.onload = () => {
                loaded++;
                setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
                if (loaded === FRAME_COUNT) {
                    imagesRef.current = images;
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                loaded++;
                if (loaded === FRAME_COUNT) {
                    imagesRef.current = images;
                    setIsLoaded(true);
                }
            };
            images[i] = img;
        }
    }, []);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];
        if (!canvas || !img || !img.complete) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Object-fit: cover
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let dw: number, dh: number, dx: number, dy: number;

        if (imgRatio > canvasRatio) {
            dh = h;
            dw = dh * imgRatio;
            dx = (w - dw) / 2;
            dy = 0;
        } else {
            dw = w;
            dh = dw / imgRatio;
            dx = 0;
            dy = (h - dh) / 2;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, dx, dy, dw, dh);
    }, []);

    // Listen to scroll progress
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT));
        if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            requestAnimationFrame(() => renderFrame(frameIndex));
        }
    });

    // Initial render + resize
    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }

        const handleResize = () => {
            if (isLoaded) renderFrame(currentFrameRef.current);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, renderFrame]);

    return (
        <section id="home" ref={containerRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
                <canvas ref={canvasRef} className="block w-full h-full" />

                {/* Loading indicator */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-30">
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#6c63ff] to-[#00d2ff] rounded-full transition-all duration-300"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-3 font-mono">{loadProgress}%</p>
                    </div>
                )}
            </div>
        </section>
    );
}
