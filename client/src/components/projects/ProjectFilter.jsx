import React from 'react';
import { motion } from 'framer-motion';

const ProjectFilter = ({ categories, activeCategory, onFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(category)}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-designColor text-bodyColor'
              : 'glass-card text-textColor hover:bg-white/20'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default ProjectFilter;
