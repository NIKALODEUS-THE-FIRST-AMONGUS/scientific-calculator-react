import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({ children, type = 'number', onClick, className = '', variants }) => {
  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { 
      scale: 4, 
      opacity: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.button
      className={`btn btn-${type} ${className}`}
      onClick={onClick}
      variants={variants || buttonVariants}
      whileHover="hover"
      whileTap="tap"
      initial="hidden"
      animate="visible"
    >
      <motion.span className="btn-content">
        {children}
      </motion.span>
      <motion.div 
        className="btn-ripple"
        variants={rippleVariants}
        initial="initial"
        whileTap="animate"
      />
    </motion.button>
  );
};

export default Button;