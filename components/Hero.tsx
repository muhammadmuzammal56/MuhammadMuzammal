'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 191;

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const currentFrameRef = useRef(0);
    const [windowHeight, setWindowHeight] = useState(0);

    // Track global scroll
    const { scrollY } = useScroll();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
            const handleResize = () => setWindowHeight(window.innerHeight);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // --- Image Preloading ---
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

    // --- Canvas Rendering ---
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Safety check for index
        const safeIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
        const img = imagesRef.current[safeIndex];
        if (!img || !img.complete) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
        } else {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let dw, dh, dx, dy;

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

    // --- Scroll Mapping ---
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!isLoaded || !windowHeight) return;

        // SCROLL LOGIC:
        // We want the animation to play over a distance of roughly 4-5 screen heights (500vh total container).
        // Let's map 0px -> 4000px scroll to frame 0 -> 191.
        const scrollDistance = windowHeight * 4;

        const progress = Math.min(1, Math.max(0, latest / scrollDistance));
        const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));

        if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            requestAnimationFrame(() => renderFrame(frameIndex));
        }
    });

    // Initial render
    useEffect(() => {
        if (isLoaded) renderFrame(0);
    }, [isLoaded, renderFrame]);


    // --- Overlay Transforms ---
    // We map directly based on the scrollY value relative to windowHeight
    // Assuming 4 full screens of scrolling for the sequence.

    // Helper to get scroll range in pixels
    const h = windowHeight || 1000; // fallback

    const opacity1 = useTransform(scrollY, [0, h * 0.5, h * 0.8], [1, 1, 0]);
    const y1 = useTransform(scrollY, [0, h * 0.8], [0, -50]);
    const scale1 = useTransform(scrollY, [0, h * 0.8], [1, 0.9]);

    const opacity2 = useTransform(scrollY, [h * 0.9, h * 1.1, h * 1.6, h * 1.8], [0, 1, 1, 0]);
    const y2 = useTransform(scrollY, [h * 0.9, h * 1.8], [50, -50]);

    const opacity3 = useTransform(scrollY, [h * 1.9, h * 2.1, h * 2.6, h * 2.8], [0, 1, 1, 0]);
    const y3 = useTransform(scrollY, [h * 1.9, h * 2.8], [50, -50]);

    const opacity4 = useTransform(scrollY, [h * 2.9, h * 3.1, h * 3.6, h * 3.8], [0, 1, 1, 0]);
    const y4 = useTransform(scrollY, [h * 2.9, h * 3.8], [30, -30]);

    return (
        <>
            {/* 2. Fixed Canvas Layer (remains visible until covered by next section) */}
            <div className="fixed top-0 left-0 w-full h-screen !fixed !top-0 !left-0 z-1">
                <canvas ref={canvasRef} className="block w-full h-full object-cover" />

                {/* Loading Indicator */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
                        <div className="text-center">
                            <p className="text-gray-400 font-mono text-sm mb-2">Initialize System...</p>
                            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                                <motion.div
                                    className="h-full bg-blue-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${loadProgress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Fixed Overlay Content Layer */}
            <div className="fixed top-0 left-0 w-full h-screen !fixed !top-0 !left-0 z-10 pointer-events-none">
                {isLoaded && (
                    <>
                        {/* Hero Title - Bottom Left, Compact */}
                        <motion.div
                            style={{ opacity: opacity1, y: y1, scale: scale1 }}
                            className="absolute inset-0 flex flex-col justify-center p-6"
                        >
                            <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 md:px-10">
                                <div className="text-left max-w-xl">
                                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
                                        MUHAMMAD <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 text-glow">
                                            MUZAMMAL
                                        </span>
                                    </h1>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 1 }}
                                        className="flex flex-col items-start mt-3"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            <p className="text-lg md:text-2xl text-white font-light tracking-wide">
                                                Front-End Developer
                                            </p>
                                        </div>
                                        <p className="text-base md:text-xl text-gray-400 font-light tracking-wide pl-4">
                                            & Software Engineer
                                        </p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Scroll Indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                            >
                                <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll to Explore</span>
                                <div className="w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
                            </motion.div>
                        </motion.div>

                        {/* Section 2 - Offset Layout */}
                        <motion.div
                            style={{ opacity: opacity2, y: y2 }}
                            className="absolute inset-0 flex items-center px-6 md:px-24"
                        >
                            <div className="glass-card p-10 rounded-2xl max-w-2xl border-l-4 border-l-blue-500">
                                <h2 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] mb-8 tracking-tight">
                                    BUILDING <br />
                                    <span className="text-stroke">RESPONSIVE</span>
                                </h2>
                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
                                    Crafting high-performance <span className="text-white font-medium">Web Applications</span> and modern UI systems.
                                    Specializing in React.js and front-end technologies.
                                </p>
                            </div>
                        </motion.div>

                        {/* Section 3 - Right Aligned with Tech Vibe */}
                        <motion.div
                            style={{ opacity: opacity3, y: y3 }}
                            className="absolute inset-0 flex items-center justify-end px-6 md:px-24 text-right"
                        >
                            <div className="glass-card p-10 rounded-2xl max-w-2xl border-r-4 border-r-purple-500">
                                <h2 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] mb-8 tracking-tight">
                                    <span className="text-stroke">MODERN</span> <br />
                                    WEB
                                </h2>
                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed ml-auto max-w-lg">
                                    Delivering seamless user experiences with <span className="text-white font-medium">React.js & .NET Core</span>.
                                    Ensuring performance and reliability across all platforms.
                                </p>
                            </div>
                        </motion.div>

                        {/* Section 4 - Minimalist Call to Action */}
                        <motion.div
                            style={{ opacity: opacity4, y: y4 }}
                            className="absolute inset-0 flex items-center justify-center p-6 text-center"
                        >
                            <div className="relative z-10">
                                <div className="absolute -inset-10 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
                                <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter">
                                    READY TO <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">INNOVATE?</span>
                                </h2>
                                <a
                                    href="#about"
                                    className="pointer-events-auto group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold tracking-wide hover:scale-105 transition-all duration-300"
                                >
                                    <span>EXPLORE WORK</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>

            {/* 1. The Scroll Spacer (defines the height of the hero experience) */}
            <div className="relative h-[420vh]" />
        </>
    );
}
