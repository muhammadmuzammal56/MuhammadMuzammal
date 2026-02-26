'use client';

import { motion, useScroll, useTransform, useReducedMotion, Variants, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Send, MessageSquare, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const contactInfo = [
    {
        icon: Mail,
        label: 'Email',
        value: 'muhammadmuzammal56@gmail.com',
        href: 'mailto:muhammadmuzammal56@gmail.com',
        color: 'text-blue-400',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+92 310 7278988',
        href: 'tel:+923107278988',
        color: 'text-emerald-400',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: '620/8 H Block Sabzazar, Lahore',
        href: '#',
        color: 'text-purple-400',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'Muhammad Muzammal',
        href: 'https://www.linkedin.com/in/muhammad-muzammal',
        color: 'text-blue-500',
    },
];

export default function Contact() {
    const containerRef = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Initialize EmailJS on mount
    useEffect(() => {
        emailjs.init({
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
        });
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const shouldReduceMotion = useReducedMotion();

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const result = await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
                formRef.current,
            );
            console.log('EmailJS Success:', result.status, result.text);
            setSubmitStatus('success');
            formRef.current.reset();
        } catch (error: any) {
            console.error('EmailJS Error:', error?.status, error?.text, error?.message, JSON.stringify(error));
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative z-20 w-full min-h-screen py-48 md:py-64 flex flex-col items-center bg-[#121212]/30 backdrop-blur-md overflow-hidden"
        >

            {/* Massive Ambient Background Glow */}
            <motion.div
                style={{ y: shouldReduceMotion ? 0 : y }}
                className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"
            />

            <div className="w-full max-w-7xl px-6 relative z-10 mx-auto">


                {/* Spacious Header Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    style={{ marginTop: '10rem' }}
                    className="mb-48 text-center pt-72 pb-12"
                >
                    <span className="text-sm font-mono text-purple-500 tracking-[0.5em] uppercase mb-12 block font-bold">Inquiries</span>
                    <h2 className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-none mb-24">
                        Let&apos;s Build <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-500">Together.</span>
                    </h2>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] max-w-md mx-auto">
                        Currently accepting new projects and technical consultations for 2025.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32" style={{ marginTop: '6rem' }}>

                    {/* Contact Form Container (Spacious Layout) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <form ref={formRef} className="space-y-20" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="group space-y-4">
                                    <label className="text-xs uppercase tracking-[0.5em] text-gray-400 font-mono ml-1 group-focus-within:text-purple-400 transition-colors font-bold">Identification</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        placeholder="Name or Organization"
                                        className="w-full bg-white/5 border-b-2 border-white/30 py-6 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-sm md:text-base font-light rounded-t-2xl backdrop-blur-sm"
                                    />
                                </div>
                                <div className="group space-y-4">
                                    <label className="text-xs uppercase tracking-[0.5em] text-gray-400 font-mono ml-1 group-focus-within:text-blue-500 transition-colors font-bold">E-Mail Address</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        placeholder="hello@world.com"
                                        className="w-full bg-white/5 border-b-2 border-white/30 py-6 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm md:text-base font-light rounded-t-2xl backdrop-blur-sm"
                                    />
                                </div>
                            </div>

                            <div className="group space-y-4 pt-12">
                                <label className="text-xs uppercase tracking-[0.5em] text-gray-400 font-mono ml-1 group-focus-within:text-emerald-500 transition-colors font-bold">The Brief / Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Tell me about your vision, technical challenges, or just say hello..."
                                    className="w-full bg-white/5 border-b-2 border-white/30 py-6 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white/10 transition-all text-sm md:text-base font-light resize-none leading-relaxed rounded-t-2xl backdrop-blur-sm"
                                />
                            </div>

                            <div className="pt-8 flex flex-col gap-6">
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={isSubmitting ? {} : { x: 15 }}
                                    className={`flex items-center gap-6 group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 shadow-2xl">
                                        {isSubmitting ? (
                                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                                        ) : (
                                            <Send className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                                        )}
                                    </div>
                                    <div className="flex flex-col items-start transition-transform duration-500">
                                        <span className="text-xs font-black tracking-[0.4em] text-white">
                                            {isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                                        </span>
                                        <span className="text-[10px] font-mono text-gray-600 uppercase group-hover:text-blue-500">
                                            {isSubmitting ? 'Data Encoding in Progress' : 'Ready for Transmission'}
                                        </span>
                                    </div>
                                </motion.button>

                                <AnimatePresence mode="wait">
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex items-center gap-3 text-emerald-400 font-mono text-xs tracking-widest uppercase"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Message Transmitted Successfully</span>
                                        </motion.div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex items-center gap-3 text-red-400 font-mono text-xs tracking-widest uppercase"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>Transmission Failed. Please try again.</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </motion.div>

                    {/* Direct Contact & Socials (Lateral Column) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="lg:col-span-5 flex flex-col"
                    >
                        <div className="space-y-24">
                            <div className="space-y-8">
                                <h4 className="text-gray-400 text-xl font-medium tracking-tight">Direct Channels</h4>
                                <div className="space-y-12">
                                    {contactInfo.map((item, index) => (
                                        <motion.a
                                            key={index}
                                            href={item.href}
                                            target={item.href.startsWith('http') ? '_blank' : undefined}
                                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="flex items-center gap-8 group cursor-pointer"
                                            whileHover={{ x: 10 }}
                                        >
                                            <div className={`p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 ${item.color} group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-700 shadow-2xl`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-mono font-bold">{item.label}</p>
                                                <p className="text-xl font-bold text-white tracking-tighter group-hover:text-blue-400 transition-colors">{item.value}</p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Extra Action / Availability */}
                            <div className="pt-24 md:pt-32">
                                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-12" />
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>Current Status</span>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                        <span className="text-2xl font-extrabold text-white tracking-tight">Available For Hire</span>
                                    </div>
                                    <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                                        Focused on building responsive web applications with React.js and modern front-end technologies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Text Reveal (Subtle) */}
            <div className="absolute bottom-20 right-[-5%] rotate-[-90deg] hidden xl:block opacity-[0.02] pointer-events-none select-none">
                <span className="text-[15rem] font-black text-white tracking-tighter uppercase whitespace-nowrap">CONTACT / 2025</span>
            </div>
        </section>
    );
}
