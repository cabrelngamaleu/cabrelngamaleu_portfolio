import React from 'react';
import { FaCode, FaServer, FaMobile, FaPalette } from 'react-icons/fa';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import StatsCounter from './StatsCounter';

const AboutSection = () => {
  const services = [
    { icon: FaCode, title: 'Développement Web', desc: "Apps React/Next.js ultra-performantes, SEO & accessibilité au pixel près." },
    { icon: FaServer, title: 'Backend & API', desc: 'APIs REST/GraphQL robustes, auth, temps réel, scalabilité.' },
    { icon: FaMobile, title: 'Applications Mobiles', desc: 'React Native cross-platform, offline-first & animations fluides.' },
    { icon: FaPalette, title: 'UI/UX Design', desc: 'Interfaces claires, design system, micro-interactions qui convertissent.' },
  ];
  const stats = [
    { end: 6, suffix: '+', label: "Ans d'expérience" },
    { end: 50, suffix: '+', label: 'Projets réalisés' },
    { end: 30, suffix: '+', label: 'Clients satisfaits' },
    { end: 100, suffix: '%', label: 'Engagement' },
  ];
  return (
    <section id="about" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 mesh-bg opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="À propos" title="Je construis des produits qui allient vitesse, beauté et business." subtitle="Full-stack orienté produit : de l'idée au déploiement, je shippe vite sans sacrifier la qualité." />

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-6 mb-6">
          <GlassCard spotlight className="lg:col-span-7 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-designColor/10 blur-[50px] rounded-full pointer-events-none" />
            <p className="text-xs tracking-[0.18em] uppercase font-semibold text-designColor mb-3">Bio</p>
            <h3 className="font-titleFont font-bold text-white text-2xl sm:text-[28px] leading-tight mb-4">
              Développeur Full-Stack <span className="text-textMuted font-medium">— passionné par le craft.</span>
            </h3>
            <div className="space-y-3.5 text-[15px] leading-relaxed text-textMuted">
              <p>6 ans à transformer des idées ambitieuses en produits <span className="text-textColor font-medium">rapides, scalables et mémorables</span>. React, Node.js, MongoDB, TypeScript — mon terrain de jeu quotidien.</p>
              <p>Mon obsession : le détail qui fait la différence — une animation à 60fps, un temps de chargement divisé par deux, un parcours qui convertit.</p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {['Clean Architecture', 'Performance', 'DX', 'Accessibilité'].map((k) => (
                <li key={k} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-textColor"><FiCheck className="text-designColor" />{k}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase font-semibold text-textFaint mb-4">Focus actuel</p>
              <ul className="space-y-4">
                {[
                  { t: 'Disponible en freelance', d: 'Missions courtes & longues — remote ou hybride.' },
                  { t: 'Basé à Yaoundé', d: 'Travail avec clients Europe / Afrique / Remote worldwide.' },
                  { t: 'Stack préférée', d: 'React • Next.js • Node.js • MongoDB • Tailwind • Framer Motion' },
                ].map((item) => (
                  <li key={item.t} className="flex gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-designColor shrink-0" />
                    <div><div className="text-sm font-semibold text-white">{item.t}</div><div className="text-sm text-textMuted">{item.d}</div></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0a0a0b] text-sm font-semibold hover:bg-zinc-100 transition-colors">Discuter d’un projet <FiArrowUpRight /></a>
              <span className="text-xs text-textFaint">Réponse en &lt; 24h</span>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {services.map((s, i) => (
            <GlassCard key={s.title} delay={i * 0.06} spotlight className="group">
              <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4 group-hover:bg-designColor group-hover:text-[#0a0a0b] group-hover:border-designColor transition-colors">
                <s.icon className="text-lg" />
              </div>
              <h4 className="font-semibold text-white mb-1.5">{s.title}</h4>
              <p className="text-sm leading-relaxed text-textMuted">{s.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="!p-0 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
            {stats.map((stat, index) => (
              <div key={index} className="px-6 py-7 sm:py-8 text-center">
                <StatsCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default AboutSection;
