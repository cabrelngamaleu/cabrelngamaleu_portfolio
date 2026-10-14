import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import SkillCircle from './SkillCircle';
import TechIcon from './TechIcon';
import { skillsData } from '../../data/skillsData';

const SkillsSection = () => {
  const categories = [
    { key: 'frontend', title: 'Frontend' },
    { key: 'backend', title: 'Backend' },
    { key: 'tools', title: 'Outils & DevOps' },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Mes Compétences" subtitle="Technologies et outils que je maîtrise" />

        <div className="space-y-16">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-titleFont font-bold text-designColor mb-8 text-center">
                {category.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsData[category.key].map((skill, index) => (
                  <GlassCard key={index} delay={index * 0.1}>
                    <div className="flex flex-col items-center space-y-4">
                      <TechIcon Icon={skill.icon} size={48} />
                      <h4 className="text-lg font-semibold text-textColor">{skill.name}</h4>
                      <SkillCircle percentage={skill.level} size={100} />
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
