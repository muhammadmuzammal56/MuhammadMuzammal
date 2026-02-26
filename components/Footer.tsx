'use client';

import { motion } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPin,
    Globe,
    Linkedin,
    Github,
    Twitter,
    ArrowUpRight
} from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const languages = ['Urdu', 'English'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
    return (
        <footer className="relative w-full border-t border-white/10 bg-black/60 backdrop-blur-xl z-40 overflow-hidden">
            {/* Content Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative z-10 w-full px-8 md:px-16 lg:px-20 py-12 md:py-20"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

                    {/* LEFT COLUMN: Branding & Contact */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-6">
                        {/* Brand */}
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                Muhammad Muzammal<span className="text-orange-500">.</span>
                            </h2>
                            <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-sm">
                                Creating seamless digital experiences with a focus on performance, aesthetic excellence, and scalable architecture.
                            </p>
                        </div>

                        {/* Contact Block */}
                        <div className="flex flex-col gap-4 mt-2">
                            <a
                                href="tel:+923107278988"
                                className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors duration-300 group w-fit"
                            >
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-orange-500/10 transition-colors">
                                    <Phone className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <span className="text-sm tracking-wide group-hover:translate-x-1 transition-transform">+92 310 7278988</span>
                            </a>

                            <a
                                href="mailto:muhammadmuzammal56@gmail.com"
                                className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors duration-300 group w-fit"
                            >
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-orange-500/10 transition-colors">
                                    <Mail className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <span className="text-sm tracking-wide group-hover:translate-x-1 transition-transform">muhammadmuzammal56@gmail.com</span>
                            </a>

                            <div className="flex items-center gap-3 text-gray-400 group w-fit">
                                <div className="p-2 rounded-full bg-white/5">
                                    <MapPin className="w-4 h-4 text-gray-300" />
                                </div>
                                <span className="text-sm tracking-wide">620/8 H Block Sabzazar, Lahore</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* CENTER COLUMN: Navigation */}
                    <motion.div variants={itemVariants} className="flex flex-col items-start md:items-center">
                        <div className="flex flex-col gap-6 w-full max-w-xs">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-4 w-full">
                                Navigation
                            </h3>
                            <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (link.href === '#home') {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                } else {
                                                    const el = document.querySelector(link.href);
                                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                            className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition-transform" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Socials & Extras */}
                    <motion.div variants={itemVariants} className="flex flex-col items-start md:items-end gap-8">
                        {/* Header for Tech/Social */}
                        <div className="w-full md:text-right">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-4 w-full inline-block md:w-auto">
                                Connect
                            </h3>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/muhammad-muzammal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-orange-500/50 hover:scale-110 transition-all duration-300 group"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                            </a>
                            <a
                                href="https://github.com/muhammad-muzammal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-orange-500/50 hover:scale-110 transition-all duration-300 group"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                            </a>
                        </div>

                        {/* Languages */}
                        <div className="flex flex-col md:items-end gap-3">
                            <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">Languages</span>
                            <div className="flex gap-2">
                                {languages.map((lang) => (
                                    <span
                                        key={lang}
                                        className="text-xs font-medium text-gray-400 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/30 hover:text-white transition-all cursor-default"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="text-left md:text-right mt-auto pt-8 md:pt-0">
                            <p className="text-gray-500 text-xs">
                                &copy; 2026 Muhammad Muzammal. All Rights Reserved.
                            </p>
                            <p className="text-gray-600 text-[10px] mt-2 font-light flex items-center gap-1 md:justify-end">
                                Built with <span className="text-white font-medium">Next.js</span> & <span className="text-white font-medium">Framer Motion</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </footer>
    );
}
