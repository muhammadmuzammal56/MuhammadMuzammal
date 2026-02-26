'use client';

import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />

      <main className="relative">
        {/* 
          Hero Section: 
          Contains the Scrollytelling Canvas + Overlay logic.
          It spans 500vh but the content is sticky.
        */}
        <Hero />

        {/* 
          Content Sections:
          These will naturally scroll into view after the Hero section's sticky scrolling is complete.
          The z-index and background color ensure they cover anything underneath if needed.
        */}
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
