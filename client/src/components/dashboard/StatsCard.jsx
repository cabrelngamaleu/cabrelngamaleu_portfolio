import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color = 'designColor', loading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 rounded-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-textColor/70 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-textColor">
            {loading ? <span className="animate-pulse">---</span> : value}
          </p>
        </div>
        {Icon && (
          <div
            className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}
            style={{
              backgroundColor: `var(--${color}, rgba(237, 255, 32, 0.1))`,
            }}
          >
            <Icon
              className={`text-${color}`}
              size={24}
              style={{ color: `var(--${color}, #edff20)` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
