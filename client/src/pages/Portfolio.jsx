import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import SkillsSection from '../components/skills/SkillsSection';
import ProjectsSection from '../components/projects/ProjectsSection';
import BlogSection from '../components/blog/BlogSection';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/layout/Footer';

const Portfolio = () => {
  return (
    <div className="w-full min-h-screen bg-bodyColor text-textColor">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
