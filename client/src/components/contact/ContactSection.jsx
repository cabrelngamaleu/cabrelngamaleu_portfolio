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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-titleFont font-bold text-designColor mb-4">
                Informations de Contact
              </h3>
              <p className="text-textColor/80 text-base md:text-lg mb-8">
                N'hésitez pas à me contacter pour discuter de vos projets, 
                opportunités ou simplement pour échanger.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <GlassCard key={index} delay={index * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-designColor/20 flex items-center justify-center">
                      <info.icon className="text-designColor text-xl" />
                    </div>
                    <div>
                      <p className="text-textColor/70 text-sm mb-1">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-textColor text-base hover:text-designColor transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-textColor text-base">{info.value}</p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-textColor">
                  <span className="text-designColor font-semibold">Disponible</span> pour de nouveaux projets
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
