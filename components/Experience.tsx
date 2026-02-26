'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight, Binary, Cpu, Cloud, Smartphone } from 'lucide-react';
import { useRef } from 'react';

const experiences = [
    {
        role: 'Assistant Manager IT (AMIT)',
        company: 'MEPCO – Power Sector',
        period: 'Mar 2025 – Present',
        project: 'Front-End Development',
        icon: Cloud,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        points: [
            'Leads front-end development for internal and external power sector solutions.',
            'Manages code deployments and collaborates  for production rollouts.',
            'Continues enhancements to EOPS focusing on performance, stability, and features.',
        ],
        tech: ['React.js', 'Production Deployments', 'EOPS'],
    },
    {
        role: 'Management Trainee Officer (MTO)',
        company: 'MEPCO – Power Sector',
        period: 'Dec 2024 – Mar 2025',
        project: 'GIS & Dashboard Systems',
        icon: Smartphone,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        points: [
            'Developed a GIS-based complaint and control system for task allocation to linemen.',
            'Built hierarchical dashboards, reporting modules, and role-based workflows for application processing.',
            'Handled production deployments and application optimization.',
        ],
        tech: ['React.js', 'GIS', 'Dashboards', 'Role-Based Workflows'],
    },
    {
        role: 'Front-End Developer',
        company: 'MEPCO – Power Sector',
        period: 'Dec 2022 – Dec 2024',
        project: 'MEPCO Smart, Citizen Monitor & EOPS',
        icon: Binary,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        points: [
            'Contributed to key projects: MEPCO Smart, Citizen Monitor, and EOPS.',
            'Created responsive interfaces using React.js, Material UI, SCSS, and ASP.NET.',
            'Focused on front-end design, API integrations, and feature enhancements.',
        ],
        tech: ['React.js', 'Material UI', 'SCSS', 'ASP.NET', 'API Integration'],
    },
];

export default function Experience() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const shouldReduceMotion = useReducedMotion();

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="experience" ref={containerRef} className="relative z-20 w-full py-16 md:py-32 flex flex-col items-center bg-[#121212]/30 backdrop-blur-md overflow-hidden">

            {/* Background Glow */}
            <motion.div
                style={{ y: shouldReduceMotion ? 0 : y }}
                className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-blue-900/5 pointer-events-none"
            />

            <div className="w-full max-w-7xl px-6 relative z-10 mx-auto">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="mb-12 md:mb-32 text-center"
                >
                    <span className="text-sm font-mono text-purple-500 tracking-widest uppercase mb-4 block">Professional Path</span>
                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight">
                        Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Experience.</span>
                    </h2>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative max-w-6xl mx-auto">

                    {/* Main Timeline Line — Desktop only */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent -translate-x-1/2 hidden md:block z-0" />

                    <div className="space-y-20 md:space-y-40">
                        {experiences.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-0 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Node (Icon) — Desktop: centered on line, Mobile: inside the card */}
                                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden md:block">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`p-5 rounded-3xl bg-[#121212] border ${job.border} ${job.color} shadow-[0_0_30px_rgba(168,85,247,0.2)] ring-[16px] ring-[#121212]`}
                                    >
                                        <job.icon className="w-10 h-10" />
                                    </motion.div>
                                </div>

                                {/* ====== MOBILE CARD (shown < md) ====== */}
                                <div className="block md:hidden w-full">
                                    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-7">
                                        {/* Accent top bar */}
                                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${index % 2 === 0 ? 'from-purple-500 to-blue-500' : 'from-blue-500 to-purple-500'
                                            }`} />

                                        {/* Icon + Period row */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-2.5 rounded-xl border ${job.border} ${job.color} ${job.bg}`}>
                                                <job.icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                {job.period}
                                            </div>
                                        </div>

                                        {/* Role + Company */}
                                        <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight mb-1">
                                            {job.role}
                                        </h3>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-3">
                                            {job.company}
                                        </p>

                                        {/* Project */}
                                        <div className="border-l-3 border-purple-500/40 pl-3 mb-4">
                                            <p className="text-sm text-purple-300/90 font-medium italic leading-relaxed">
                                                {job.project}
                                            </p>
                                        </div>

                                        {/* Points */}
                                        <ul className="space-y-2.5 mb-4">
                                            {job.points.map((point, j) => (
                                                <li key={j} className="flex items-start gap-2.5 text-gray-400 text-sm leading-relaxed">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2">
                                            {job.tech.map((t, j) => (
                                                <span
                                                    key={j}
                                                    className="text-[9px] font-black tracking-widest text-gray-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* ====== DESKTOP Content Card (shown >= md) ====== */}
                                <div className={`hidden md:block md:w-[45%] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="group relative transition-all duration-300">

                                        <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} mb-8`}>
                                            <h3 className="text-5xl font-extrabold text-white tracking-tighter group-hover:text-purple-400 transition-colors leading-tight">
                                                {job.role}
                                            </h3>
                                            <p className="text-xl font-bold text-gray-400 mt-3 uppercase tracking-[0.25em]">
                                                {job.company}
                                            </p>
                                        </div>

                                        <div className={`mb-10 ${index % 2 === 0 ? 'md:border-r-4 md:border-l-0 pr-6' : 'border-l-4 pl-6'} border-purple-500/30 py-2`}>
                                            <p className="text-xl text-purple-300/90 font-medium italic leading-relaxed">
                                                {job.project}
                                            </p>
                                        </div>

                                        <ul className={`space-y-6 mb-12 flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                                            {job.points.map((point, j) => (
                                                <li key={j} className={`flex items-start gap-4 text-gray-400 text-lg leading-relaxed group/item ${index % 2 === 0 ? 'md:flex-row-reverse text-right' : ''}`}>
                                                    <div className={`mt-3 w-2 h-2 rounded-full bg-purple-500 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover/item:scale-150 transition-transform`} />
                                                    <span className="group-hover/item:text-gray-100 transition-colors">{point}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Tech Stack */}
                                        <div className={`flex flex-wrap gap-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                            {job.tech.map((t, j) => (
                                                <span
                                                    key={j}
                                                    className="text-xs font-black tracking-widest text-gray-500 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-300 transition-all duration-300"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Date Box — Desktop only */}
                                <div className={`hidden md:flex md:w-[45%] ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                    <div className="flex flex-col items-center gap-4 group">
                                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-10 py-5 rounded-[2rem] shadow-2xl transition-all duration-500 group-hover:border-purple-500/50 group-hover:bg-white/10 group-hover:-translate-y-2">
                                            <Calendar className="w-6 h-6 text-purple-500 group-hover:rotate-12 transition-transform" />
                                            <span className="text-xl font-mono text-gray-200 font-bold tracking-tight">{job.period}</span>
                                        </div>
                                        <div className="w-1.5 h-12 bg-gradient-to-b from-purple-500/30 to-transparent rounded-full opacity-30 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
