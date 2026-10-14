import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 lg:mb-16"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-titleFont font-bold text-designColor mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-textColor max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
