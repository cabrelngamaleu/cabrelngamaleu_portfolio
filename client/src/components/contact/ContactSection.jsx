import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import ContactForm from './ContactForm';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: 'Adresse',
      value: 'Yaoundé, Cameroun',
    },
    {
      icon: FaPhone,
      label: 'Téléphone',
      value: '+237 695 66 99 21',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'ncabrel@yahoo.fr',
      link: 'mailto:ncabrel@yahoo.fr',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Contactez-moi"
          subtitle="Travaillons ensemble sur votre prochain projet"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div>
              <h3 className="font-titleFont font-bold text-white text-2xl sm:text-3xl leading-tight mb-3">
                Parlons de votre <span className="gradient-text-green">prochain projet</span>
              </h3>
              <p className="text-textMuted text-[15px] leading-relaxed">
                Une idée, une refonte, un besoin d’accélération ? Je réponds vite, clairement, avec
                un plan d’action.
              </p>
            </div>
            <div className="grid gap-3">
              {contactInfo.map((info, index) => (
                <GlassCard key={index} delay={index * 0.06} spotlight className="!p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                      <info.icon className="text-white text-lg" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs tracking-wide uppercase font-semibold text-textFaint">
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-white text-sm font-medium hover:text-designColor transition-colors break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="!py-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-sm text-textColor">
                  <span className="font-semibold text-white">Disponible</span>{' '}
                  <span className="text-textMuted">
                    — réponse en &lt; 24h, call de cadrage offerte.
                  </span>
                </p>
              </div>
            </GlassCard>
          </motion.div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
