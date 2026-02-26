'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        if (href === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }

        setMobileOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#121212]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="w-full px-8 md:px-16 lg:px-20 flex items-end justify-between">
                    {/* Logo Area */}
                    <a href="#home" className="group flex flex-col">
                        <span className="text-xs font-mono text-gray-500 mb-1 block group-hover:text-blue-400 transition-colors">EST. 2026</span>
                        <div className="text-xl font-bold tracking-tighter text-white leading-none">
                            Muzammal<span className="text-blue-500">.</span>
                        </div>
                    </a>

                    {/* Desktop Navigation - Minimalist Text */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className="relative text-xs uppercase tracking-[0.2em] font-medium text-gray-400 hover:text-white transition-colors duration-300 py-2 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Right Side - Connect Button (Desktop) & Menu Toggle (Mobile) */}
                    <div className="flex items-center gap-6">
                        {/* Desktop Button */}
                        <a
                            href="#contact"
                            className="hidden md:inline-flex items-center justify-center px-6 py-2 border border-white/10 rounded-full text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Let's Talk
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden text-white flex flex-col items-end gap-1.5 group p-2"
                        >
                            <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'w-6 rotate-45 translate-y-2' : 'w-8'}`} />
                            <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : 'w-6 group-hover:w-8'}`} />
                            <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4 group-hover:w-8'}`} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center px-8 md:hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleClick(e, link.href)}
                                        className="inline-block text-5xl font-bold text-gray-400 hover:text-white hover:translate-x-4 transition-all duration-300"
                                    >
                                        <span className="text-lg font-mono text-blue-500 mr-4">0{i + 1} //</span>
                                        {link.label}
                                    </a>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-12 left-8 right-8 pt-8 border-t border-white/10 flex justify-between items-center text-gray-500 font-mono text-xs uppercase"
                        >
                            <span>Lahore, PK</span>
                            <span>M.Muzammal © 2026</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
