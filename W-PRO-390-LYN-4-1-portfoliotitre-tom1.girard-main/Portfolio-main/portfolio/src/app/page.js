"use client";

import { useEffect } from 'react';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AboutSection from './components/AboutSection';

const Portfolio = () => {
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div id="home" className="pt-16">
          <Home />
        </div>

        <div className="bg-black text-white backdrop-blur-sm">
          <div id="about" className="scroll-mt-16">
            <AboutSection />
          </div>

          <div id="projects" className="scroll-mt-16">
            <ProjectsSection />
          </div>
          
          <div id="skills" className="scroll-mt-16">
            <SkillsSection />
          </div>
          
          <div id="contact" className="scroll-mt-16">
            <ContactSection />
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
