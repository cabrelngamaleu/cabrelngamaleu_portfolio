import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-designColor text-bodyColor hover:bg-designColor/90 hover:shadow-greenShadow",
    secondary: "glass-card text-textColor hover:bg-white/20",
    outline: "border-2 border-designColor text-designColor hover:bg-designColor hover:text-bodyColor",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
