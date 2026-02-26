'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { BookOpen, GraduationCap, Award, Calendar, MapPin, School } from 'lucide-react';
import { useRef } from 'react';

const education = [
    {
        degree: 'Bachelor of Information Technology',
        school: 'University of Education, Lahore',
        period: '2018 – 2022',
        detail: 'BIT',
        focus: 'Focusing on Web Development, Software Engineering, and IT systems.',
        icon: GraduationCap,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    {
        degree: 'FSC (Pre-Engineering)',
        school: 'Royal College of Science for Boys, Narowal',
        period: '2016 – 2018',
        detail: 'Pre-Engineering',
        focus: 'Core focus on Physics, Mathematics, and Computer Science.',
        icon: School,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20'
    },
];

const certifications = [
    {
        title: 'React Basics',
        issuer: 'Coursera',
        icon: Award,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    {
        title: 'Web Development',
        issuer: 'PSDF (Punjab Skills Development Fund)',
        icon: Award,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20'
    },
    {
        title: 'Cloud Computing & Networking',
        issuer: 'NAVTTC',
        icon: Award,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20'
    },
];

export default function Education() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const shouldReduceMotion = useReducedMotion();

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="education" ref={containerRef} className="relative z-20 w-full min-h-[80vh] py-24 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md overflow-hidden">

            {/* Background Decorations */}
            <motion.div
                style={{ y: shouldReduceMotion ? 0 : y }}
                className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-purple-900/5 pointer-events-none"
            />

            <div className="w-full max-w-[90rem] px-6 relative z-10 text-center mx-auto flex flex-col items-center">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="mb-20"
                >
                    <span className="text-sm font-mono text-blue-500 tracking-widest uppercase mb-4 block">Background</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Certifications.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl">

                    {/* Education Column */}
                    <div className="flex flex-col gap-10">
                        <motion.h3
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-2xl font-bold text-white flex items-center gap-4 justify-center lg:justify-start"
                        >
                            <BookOpen className="w-8 h-8 text-blue-500" />
                            Academic Journey
                        </motion.h3>

                        <div className="space-y-10">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="group py-8 md:py-10 transition-all duration-300 text-left flex flex-col md:flex-row gap-8 border-b border-white/5 last:border-0"
                                >
                                    <div className={`p-5 rounded-3xl ${edu.bg} ${edu.color} border ${edu.border} group-hover:scale-110 transition-transform duration-300 h-fit w-fit shadow-inner`}>
                                        <edu.icon className="w-10 h-10" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                            <h4 className="text-2xl font-extrabold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                                                {edu.degree}
                                            </h4>
                                            <span className="text-sm font-mono text-gray-500 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 h-fit">
                                                <Calendar className="w-4 h-4" />
                                                {edu.period}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400 mb-6">
                                            <MapPin className="w-5 h-5 text-blue-500/50" />
                                            <span className="text-base">{edu.school}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 items-center">
                                            {edu.detail && (
                                                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-bold text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                                    {edu.detail}
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-400 font-medium">
                                                {edu.focus}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div className="flex flex-col gap-10">
                        <motion.h3
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-2xl font-bold text-white flex items-center gap-4 justify-center lg:justify-start"
                        >
                            <Award className="w-8 h-8 text-purple-500" />
                            Professional Certifications
                        </motion.h3>

                        <div className="space-y-10">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="group py-8 md:py-10 transition-all duration-300 text-left flex flex-col md:flex-row gap-8 border-b border-white/5 last:border-0"
                                >
                                    <div className={`p-5 rounded-3xl ${cert.bg} ${cert.color} border ${cert.border} group-hover:scale-110 transition-transform duration-300 h-fit w-fit shadow-inner`}>
                                        <cert.icon className="w-10 h-10" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-extrabold text-white mb-4 group-hover:text-purple-400 transition-colors tracking-tight">
                                            {cert.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-gray-400 mb-6">
                                            <MapPin className="w-5 h-5 text-purple-500/50" />
                                            <span className="text-base">{cert.issuer}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
