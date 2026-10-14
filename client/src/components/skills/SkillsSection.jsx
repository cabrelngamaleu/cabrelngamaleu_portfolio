import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import SkillCircle from './SkillCircle';
import TechIcon from './TechIcon';
import { skillsData } from '../../data/skillsData';

const SkillsSection = () => {
  const categories = [
    { key: 'frontend', title: 'Frontend', hint: 'Interfaces rapides & accessibles' },
    { key: 'backend', title: 'Backend', hint: 'APIs & data solides' },
    { key: 'tools', title: 'Outils & DevOps', hint: 'Ship & scale' },
  ];
  return (
    <section id="skills" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Stack" title="Technologies que je maîtrise" subtitle="Une stack moderne, orientée performance, maintenabilité et expérience développeur." />
        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div key={category.key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: catIndex * 0.08 }}>
              <div className="flex items-baseline gap-3 mb-6">
                <h3 className="font-titleFont font-bold text-white text-xl sm:text-2xl">{category.title}</h3>
                <span className="text-xs tracking-wide text-textFaint hidden sm:inline">{category.hint}</span>
                <span className="flex-1 h-px bg-white/[0.06] ml-2 hidden sm:block" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {skillsData[category.key].map((skill, index) => (
                  <GlassCard key={skill.name} delay={index * 0.04} spotlight>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                        <TechIcon Icon={skill.icon} size={26} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-semibold text-white text-sm">{skill.name}</h4>
                          <span className="text-xs font-mono text-textMuted">{skill.level}%</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 + index * 0.04, ease: [0.23, 1, 0.32, 1] }} className="h-full rounded-full bg-gradient-to-r from-designColor to-accent" />
                        </div>
                      </div>
                      <div className="hidden sm:block shrink-0">
                        <SkillCircle percentage={skill.level} size={56} />
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
