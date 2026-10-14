import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { FiMail, FiDownload, FiCode, FiTerminal } from 'react-icons/fi';
import { bannerImg } from '../../assets/index';

const codeLines = [
  { t: 'const', v: ' cabrel = {', c: 'text-accent' },
  { t: '  role:', v: ' "Full-Stack Developer",', c: 'text-designColor' },
  { t: '  stack:', v: ' ["React", "Node.js", "MongoDB"],', c: 'text-designColor' },
  { t: '  passion:', v: ' "Building wow experiences"', c: 'text-designColor' },
  { t: '};', v: '', c: 'text-accent' },
];

const HeroSection = () => {
  const [text] = useTypewriter({
    words: ['Développeur Full-Stack','Ingénieur Logiciel','Architecte Solutions','Créateur d’expériences WOW'],
    loop: true, typeSpeed: 45, deleteSpeed: 28, delaySpeed: 2200,
  });
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16">
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-designColor/10 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full bg-accent/10 blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-md text-xs tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-textMuted">Disponible pour nouveaux projets</span>
              <span className="hidden sm:inline text-textFaint">•</span>
              <span className="hidden sm:inline text-textColor font-medium">Yaoundé • Remote</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="font-titleFont font-bold leading-[0.95] tracking-tight">
              <span className="block text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase text-textMuted mb-3">Bonjour, je suis</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] text-white">Cabrel</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] gradient-text-green">Ngamaleu</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 text-xl sm:text-2xl lg:text-[26px] font-medium text-textColor min-h-[36px]">
              <span className="text-textMuted font-normal">Je suis </span><span className="text-white">{text}</span><Cursor cursorStyle="▌" cursorColor="#edff20" />
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-5 text-[15px] sm:text-base leading-relaxed text-textMuted max-w-[560px] mx-auto lg:mx-0">
              Je transforme des idées ambitieuses en produits <span className="text-textColor font-medium">rapides, scalables et mémorables</span>.
              <span className="hidden sm:inline"> 6 ans d’expérience, 50+ projets livrés — du MVP à la scale.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <button onClick={() => scrollTo('projects')} className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-designColor text-[#0a0a0b] font-semibold text-sm tracking-wide hover:bg-designColorHover transition-colors btn-shimmer">
                Voir mes projets <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('contact')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/10 text-white font-medium text-sm backdrop-blur-md hover:bg-white/[0.10] transition-colors">
                <FiMail /> Me contacter
              </button>
              <a href="mailto:ncabrel@yahoo.fr" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-textMuted hover:text-white text-sm font-medium transition-colors">
                <FiDownload /> CV
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mt-7 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-textMuted">
                <span className="w-px h-6 bg-white/10 hidden sm:block" />
                <span>Retrouvez-moi sur</span>
              </div>
              <div className="flex gap-2">
                <a href="https://github.com/cabrelngamaleu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-textColor hover:text-white hover:bg-white/[0.10] transition-all"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/cabrel-ngamaleu-kakanou-26b56a7a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-textColor hover:text-white hover:bg-white/[0.10] transition-all"><FaLinkedin /></a>
                <a href="mailto:ncabrel@yahoo.fr" aria-label="Email" className="w-10 h-10 rounded-full bg-designColor text-[#0a0a0b] flex items-center justify-center hover:bg-designColorHover transition-all"><FiMail /></a>
              </div>
            </motion.div>
          </div>


          <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative lg:pl-2">
            <div className="absolute -inset-6 bg-gradient-to-br from-designColor/20 via-accent/10 to-transparent blur-2xl rounded-[32px] pointer-events-none" />
            <div className="relative rounded-[22px] overflow-hidden bg-[#0f0f10]/80 backdrop-blur-xl border border-white/[0.09] shadow-[0_24px_64px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.06)_inset]">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-2 text-xs text-textMuted"><FiTerminal className="opacity-70" /> cabrel.dev — portfolio.ts</div>
                <div className="w-10 hidden sm:block" />
              </div>
              <div className="px-5 sm:px-6 py-5 font-mono text-[13px] leading-6">
                {codeLines.map((l, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-white/20 select-none w-4 text-right">{i + 1}</span>
                    <span className={l.c}>{l.t}</span>
                    <span className="text-white/90">{l.v}</span>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {['React','Node.js','MongoDB','TypeScript'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-textColor">{t}</span>
                  ))}
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> build passed</span>
                </div>
              </div>
              <div className="px-5 sm:px-6 py-4 bg-black/20 border-t border-white/[0.06] flex items-center gap-4">
                <img src={bannerImg} alt="Cabrel" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white leading-none">Cabrel Ngamaleu</div>
                  <div className="text-xs text-textMuted flex items-center gap-1.5 mt-1"><FiCode className="text-designColor" /> Full-Stack • Yaoundé</div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <div className="text-xs text-textFaint">Disponibilité</div>
                  <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Ouvert</div>
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="absolute -bottom-4 -left-2 sm:-left-4 glass-card px-3.5 py-2.5 flex items-center gap-3 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
              <div className="w-9 h-9 rounded-xl bg-designColor flex items-center justify-center text-[#0a0a0b] font-bold text-sm">50+</div>
              <div className="text-left leading-tight"><div className="text-sm font-semibold text-white">Projets livrés</div><div className="text-xs text-textMuted">6 ans d’expérience</div></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="absolute -top-3 -right-2 sm:right-2 glass-card px-3 py-2 hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-xs font-medium text-white">En ligne</span><span className="text-xs text-textMuted">répond en ~2h</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
