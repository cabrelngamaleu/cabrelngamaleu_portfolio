import React from 'react';
import { motion } from 'framer-motion';

const ProjectFilter = ({ categories, activeCategory, onFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileTap={{ scale: 0.97 }}
          onClick={() => onFilterChange(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
            activeCategory === category
              ? 'bg-designColor text-[#0a0a0b] border-designColor shadow-[0_4px_16px_rgba(237,255,32,0.25)]'
              : 'bg-white/[0.04] border-white/10 text-textMuted hover:text-white hover:bg-white/[0.08] hover:border-white/15'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default ProjectFilter;
