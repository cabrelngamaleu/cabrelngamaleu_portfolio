import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaMobile, FaPalette } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import StatsCounter from './StatsCounter';

const AboutSection = () => {
  const services = [
    {
      icon: FaCode,
      title: 'Développement Web',
      description: 'Création d\'applications web modernes et performantes avec React, Node.js et les dernières technologies.',
    },
    {
      icon: FaServer,
      title: 'Backend & API',
      description: 'Conception et développement d\'APIs RESTful et GraphQL robustes et scalables.',
    },
    {
      icon: FaMobile,
      title: 'Applications Mobiles',
      description: 'Développement d\'applications mobiles cross-platform avec React Native.',
    },
    {
      icon: FaPalette,
      title: 'UI/UX Design',
      description: 'Création d\'interfaces utilisateur intuitives et esthétiques.',
    },
  ];

  const stats = [
    { end: 6, suffix: '+', label: 'Ans d\'expérience' },
    { end: 50, suffix: '+', label: 'Projets réalisés' },
    { end: 30, suffix: '+', label: 'Clients satisfaits' },
    { end: 100, suffix: '%', label: 'Engagement' },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="À propos de moi"
          subtitle="Découvrez mon parcours et mes compétences"
        />

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <GlassCard className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-titleFont font-bold text-designColor mb-4">
              Développeur Full-Stack Passionné
            </h3>
            <div className="text-textColor/90 space-y-4 text-base md:text-lg leading-relaxed">
              <p>
                Avec plus de 6 ans d'expérience dans le développement logiciel, je me spécialise
                dans la création d'applications web et mobiles performantes et évolutives.
              </p>
              <p>
                Ma passion pour la technologie m'a conduit à maîtriser un large éventail de technologies
                modernes, du frontend avec React et TypeScript au backend avec Node.js et MongoDB.
              </p>
              <p>
                Je m'efforce constamment d'apprendre et de rester à jour avec les dernières tendances
                et meilleures pratiques du développement web.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Services Section */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-titleFont font-bold text-center text-designColor mb-12">
            Mes Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <GlassCard key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-designColor/20">
                    <service.icon className="text-3xl text-designColor" />
                  </div>
                  <h4 className="text-xl font-titleFont font-bold text-textColor mb-3">
                    {service.title}
                  </h4>
                  <p className="text-textColor/80 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div>
          <h3 className="text-3xl md:text-4xl font-titleFont font-bold text-center text-designColor mb-12">
            Fun Facts
          </h3>
          <GlassCard>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatsCounter
                  key={index}
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
