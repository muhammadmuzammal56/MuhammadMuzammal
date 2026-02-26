'use client';

import { motion, useScroll, useTransform, useReducedMotion, Variants } from 'framer-motion';
import { Award, BookOpen, Code, Globe, Terminal } from 'lucide-react';
import { useRef } from 'react';

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect: moves background slower than scroll
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const shouldReduceMotion = useReducedMotion();

    const transition = {
        duration: 0.3,
        ease: "easeOut"
    } as const;

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="about" ref={containerRef} className="relative z-20 w-full min-h-[80vh] py-24 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md overflow-hidden">
            {/* Parallax Background Gradient */}
            <motion.div
                style={{ y: shouldReduceMotion ? 0 : y }}
                className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-purple-900/5 pointer-events-none"
            />

            <div className="w-full max-w-5xl px-6 relative z-10 text-center mx-auto flex flex-col items-center">

                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="mb-16"
                >
                    <span className="text-sm font-mono text-blue-500 tracking-widest uppercase mb-4 block">Profile</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Me.</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-16 items-center" style={{ marginTop: '6rem' }}>

                    {/* Bio / Summary */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-3xl"
                    >
                        <div className="prose prose-lg prose-invert text-gray-300 leading-relaxed font-light mx-auto">
                            <p className="text-xl md:text-2xl text-gray-200 mb-6">
                                I am an analytical <strong className="text-white font-semibold">Front-End Web Developer</strong> with over 3 years of experience, based in Lahore. Passionate about building responsive, high-performance web applications with clean and maintainable code.
                            </p>
                            <p className="opacity-80">
                                Proficient in <span className="text-blue-400 font-medium">React.js</span>, Bootstrap, Material UI, and modern CSS frameworks. A quick learner actively seeking to enhance skills as a full-stack web developer and contribute technical expertise to dynamic teams.
                            </p>
                        </div>
                    </motion.div>

                    {/* Key Strengths - Tag Cloud */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-4xl"
                    >
                        <h3 className="text-lg font-bold text-white mb-8 flex items-center justify-center gap-2">
                            <Code className="w-5 h-5 text-blue-500" />
                            Key Technical Strengths
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                "React.js",
                                "JavaScript (ES6+)",
                                ".NET Core",
                                "HTML/CSS",
                                "Bootstrap",
                                "Material UI",
                                "Tailwind CSS / SCSS",
                                "MySQL",
                                "API Integration",
                                "Highcharts.js",
                                "Formik & Yup"
                            ].map((item, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm md:text-base cursor-default transition-colors hover:border-blue-500/30"
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Facts Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="w-full max-w-3xl p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:bg-white/10 transition-colors duration-500"
                    >
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-4 flex items-center justify-center gap-2">
                            <Terminal className="w-4 h-4" />
                            Quick Facts
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-center">
                            {/* Education */}
                            <div className="flex flex-col items-center gap-2 group">
                                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <span className="text-white font-medium">Education</span>
                                <div className="flex flex-col items-center text-sm text-gray-400">
                                    <span>BS Information Technology</span>
                                    <span className="text-xs text-gray-500">University of Education Lahore</span>
                                </div>
                                <span className="mt-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-blue-300 font-mono">
                                    2018 – 2022
                                </span>
                            </div>

                            {/* Focus */}
                            <div className="flex flex-col items-center gap-2 group">
                                <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                                    <Award className="w-5 h-5" />
                                </div>
                                <span className="text-white font-medium">Focus</span>
                                <div className="flex flex-col items-center text-sm text-gray-400">
                                    <span>Front-End Development</span>
                                    <span>React Ecosystem</span>
                                    <span>Web Applications</span>
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="flex flex-col items-center gap-2 group">
                                <div className="p-3 rounded-full bg-green-500/10 text-green-400 mb-2 group-hover:scale-110 transition-transform">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <span className="text-white font-medium">Languages</span>
                                <div className="flex flex-col items-center gap-1.5 mt-1">
                                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">Urdu</span>
                                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">English</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
