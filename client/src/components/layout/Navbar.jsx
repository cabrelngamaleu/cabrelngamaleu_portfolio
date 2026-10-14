import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = ['hero', 'about', 'skills', 'projects', 'blog', 'contact'];
  const activeSection = useScrollSpy(sectionIds);

  const navLinks = [
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'projects', label: 'Projets' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-titleFont font-bold cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <span className="text-designColor">Cabrel</span>
            <span className="text-textColor"> Ngamaleu</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-base font-medium transition-all duration-300 relative ${
                  activeSection === link.id
                    ? 'text-designColor'
                    : 'text-textColor hover:text-designColor'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-designColor"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-textColor hover:text-designColor text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <MdClose /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 h-full w-64 glass-card md:hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/20">
                <h2 className="text-xl font-titleFont font-bold text-designColor">
                  Menu
                </h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-textColor hover:text-designColor text-2xl"
                >
                  <MdClose />
                </button>
              </div>

              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left text-lg font-medium transition-all duration-300 py-2 ${
                      activeSection === link.id
                        ? 'text-designColor'
                        : 'text-textColor hover:text-designColor'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;