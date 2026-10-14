import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ eyebrow, title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${isCenter ? 'text-center' : 'text-left'} mb-10 lg:mb-14`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-4 ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-6 h-px bg-designColor/60 hidden sm:block" />
          <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-designColor">
            {eyebrow}
          </span>
          <span className="w-6 h-px bg-designColor/60 hidden sm:block" />
        </div>
      )}
      <h2 className="font-titleFont font-bold tracking-tight text-white leading-tight text-3xl sm:text-4xl lg:text-[44px]">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-[15px] leading-relaxed text-textMuted max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
