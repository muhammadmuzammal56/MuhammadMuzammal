'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Section 1: visible 0-20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.22], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.22], [30, -60]);

    // Section 2: visible 28-48%
    const opacity2 = useTransform(scrollYProgress, [0.26, 0.30, 0.44, 0.48], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.26, 0.48], [40, -40]);

    // Section 3: visible 56-76%
    const opacity3 = useTransform(scrollYProgress, [0.54, 0.58, 0.72, 0.76], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.54, 0.76], [40, -40]);

    // Section 4: visible 80-95%
    const opacity4 = useTransform(scrollYProgress, [0.78, 0.82, 0.92, 0.96], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.78, 0.96], [30, -30]);

    return (
        <div ref={containerRef} className="absolute inset-0 h-[500vh] pointer-events-none z-10">
            {/* Section 1 - Hero Title */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="text-center max-w-4xl px-6"
                >
                    <motion.p
                        className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-500 mb-4"
                    >
                        Welcome to my portfolio
                    </motion.p>
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]">
                        <span className="text-white">Ahmad</span>
                        <br />
                        <span className="text-gradient">Shakeel</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-400 font-light mt-6 max-w-xl mx-auto">
                        DevOps Engineer &amp; Software Developer
                    </p>
                </motion.div>
            </div>

            {/* Section 2 - Left aligned */}
            <div className="sticky top-0 h-screen w-full flex items-center">
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="ml-8 md:ml-24 lg:ml-32 max-w-lg"
                >
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#6c63ff] to-transparent mb-6" />
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                        Building scalable,
                        <br />
                        real-time applications.
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 mt-4 leading-relaxed">
                        Automating deployments and optimizing cloud infrastructure with AWS, Docker, and Kubernetes.
                    </p>
                </motion.div>
            </div>

            {/* Section 3 - Right aligned */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-end">
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="mr-8 md:mr-24 lg:mr-32 max-w-lg text-right"
                >
                    <div className="w-12 h-0.5 bg-gradient-to-l from-[#00d2ff] to-transparent mb-6 ml-auto" />
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                        Cloud Infrastructure
                        <br />
                        &amp; Security
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 mt-4 leading-relaxed">
                        Focused on performance optimization, secure systems, and continuous improvement.
                    </p>
                </motion.div>
            </div>

            {/* Section 4 - Center */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                <motion.div
                    style={{ opacity: opacity4, y: y4 }}
                    className="text-center max-w-2xl px-6"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
                        From Concept to
                        <br />
                        <span className="text-gradient">Production</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                        Transforming ideas into robust, scalable, and secure systems that power real-world solutions.
                    </p>
                    <motion.a
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="pointer-events-auto inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        Explore my work
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
}
