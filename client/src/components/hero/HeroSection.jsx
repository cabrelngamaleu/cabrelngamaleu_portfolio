import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { bannerImg } from '../../assets/index';
import ParticlesBackground from './ParticlesBackground';
import AnimatedButton from '../common/AnimatedButton';

const HeroSection = () => {
  const [text] = useTypewriter({
    words: [
      'Développeur Full-Stack',
      'Ingénieur Logiciel',
      'Architecte Solutions',
      'Administrateur Systèmes & Réseaux',
    ],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 30,
    delaySpeed: 2000,
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <ParticlesBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-titleFont font-bold mb-6"
            >
              Bonjour, je suis{' '}
              <span className="gradient-text-green">Cabrel Ngamaleu</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl text-textColor mb-8 h-20"
            >
              <span>{text}</span>
              <Cursor cursorStyle="|" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-textColor/80 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Passionné par le développement de solutions innovantes et performantes.
              Plus de 6 ans d'expérience dans la création d'applications web et mobiles.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <AnimatedButton
                variant="primary"
                onClick={() => scrollToSection('projects')}
              >
                Voir mes projets
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                onClick={() => scrollToSection('contact')}
              >
                Me contacter
              </AnimatedButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/cabrelngamaleu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textColor hover:text-designColor transition-all duration-300 text-2xl hover:scale-110"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/cabrel-ngamaleu-kakanou-26b56a7a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textColor hover:text-designColor transition-all duration-300 text-2xl hover:scale-110"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:ncabrel@yahoo.fr"
                className="text-textColor hover:text-designColor transition-all duration-300 text-2xl hover:scale-110"
              >
                <FiMail />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Rotating gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-designColor via-green-400 to-designColor animate-spin-slow"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img
                  src={bannerImg}
                  alt="Cabrel Ngamaleu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
