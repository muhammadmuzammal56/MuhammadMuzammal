'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        title: 'E-Operations (EOPS)',
        subtitle: 'Web Portal – Role-Based Operations',
        description: 'Role-based interface for field operations featuring an interactive dashboard and digital document tracking (E-File). Streamlines internal processes with hierarchical access controls and real-time operational data.',
        tech: ['React.js', 'Material UI', 'API Integration', 'Role-Based Access'],
        color: 'from-blue-500/10 to-cyan-600/10',
    },
    {
        title: 'MEPCO Smart',
        subtitle: 'Web Portal – Power Consumer Monitoring',
        description: 'Monitoring platform for power consumers featuring load profiles, outage information, and service requests (new connections, meter replacements). Uses Highcharts.js for data visualization, Formik and Yup for form handling.',
        tech: ['React.js', 'Highcharts.js', 'Formik & Yup', 'ASP.NET'],
        color: 'from-purple-500/10 to-indigo-600/10',
    },
    {
        title: 'Citizen Monitor',
        subtitle: 'Web Portal – Anti-Theft Dashboard',
        description: 'Hierarchical dashboard displaying theft case statistics for the Ministry of Energy\'s anti-theft campaign. Provides real-time data visualization and reporting across multiple organizational levels.',
        tech: ['React.js', 'Dashboard', 'Data Visualization', 'Hierarchical Views'],
        color: 'from-green-500/10 to-emerald-600/10',
    },
    {
        title: 'WAHAJ & KAHLOON Advocates',
        subtitle: 'Professional Legal Website',
        description: 'Professional legal website with an appointment booking system and practice area pages. Clean, modern design that conveys credibility and provides easy access to legal services.',
        tech: ['React.js', 'Booking System', 'Responsive Design', 'SEO'],
        color: 'from-orange-500/10 to-red-600/10',
    },
    {
        title: 'Admin Panel (Practice)',
        subtitle: 'Business Hub for Sales & Revenue',
        description: 'Dynamic business hub for sales and revenue tracking using React hooks, ApexCharts for data visualization, and Framer Motion for smooth UI animations. Comprehensive analytics dashboard.',
        tech: ['React.js', 'ApexCharts', 'Framer Motion', 'Analytics'],
        color: 'from-yellow-500/10 to-orange-600/10',
    },
    {
        title: 'Al-Haram Petroleum',
        subtitle: 'ASP.NET Core Management Solution',
        description: 'ASP.NET Core solution for pump management, staff salaries, loan tracking, and real-time inventory. Full-stack enterprise application managing complex business operations and financial workflows.',
        tech: ['ASP.NET Core', '.NET', 'SQL Server', 'Inventory Management'],
        color: 'from-violet-500/10 to-pink-600/10',
    }
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
    return (
        <section id="projects" className="relative z-20 bg-black/40 backdrop-blur-md section-padding">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-4">Portfolio</p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-16">
                        Selected <span className="text-gradient">Work</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className={`glass rounded-2xl p-6 md:p-8 glass-hover transition-all duration-300 bg-gradient-to-br ${project.color}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                    <p className="text-sm text-[#6c63ff] mt-1">{project.subtitle}</p>
                                </div>
                                <motion.div
                                    whileHover={{ rotate: 45 }}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </motion.div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, j) => (
                                    <span
                                        key={j}
                                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-gray-300"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
