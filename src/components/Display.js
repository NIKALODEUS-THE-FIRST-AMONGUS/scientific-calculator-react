import React from 'react';
import { motion } from 'framer-motion';
import './Display.css';

const Display = ({ currentView, modes, menuSelection, selectedMode, value, expression, hasMemory }) => {
  
  if (currentView === 'menu') {
    // Main Menu View
    return (
      <motion.div 
        className="display-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="menu-header">
          <span className="menu-title">Main Menu</span>
        </div>
        
        <div className="menu-list">
          {modes.map((mode, index) => (
            <motion.div 
              key={index}
              className={`menu-option ${menuSelection === index ? 'selected' : ''} ${!mode.implemented ? 'disabled' : ''}`}
              animate={{ 
                backgroundColor: menuSelection === index ? '#000' : 'transparent',
                color: menuSelection === index ? '#7fb87f' : '#000'
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="menu-number">{index + 1}:</span>
              <span className="menu-icon">{mode.icon}</span>
              <span className="menu-name">{mode.name}</span>
              {!mode.implemented && <span className="dev-badge">DEV</span>}
            </motion.div>
          ))}
        </div>
        
        <div className="menu-instructions">
          <span>↑↓ Select • OK: Enter</span>
        </div>
      </motion.div>
    );
  }

  // Mode View (Calculate, Equation, Table, etc.)
  const currentMode = modes[selectedMode];
  
  return (
    <motion.div 
      className="display-section"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Mode header */}
      <div className="mode-header">
        <div className="mode-info">
          <span className="mode-icon">{currentMode.icon}</span>
          <span className="mode-name">{currentMode.name}</span>
        </div>
        <div className="mode-indicators">
          <motion.div 
            className="memory-indicator"
            animate={{ 
              opacity: hasMemory ? 1 : 0.3,
              scale: hasMemory ? 1 : 0.9
            }}
            transition={{ duration: 0.3 }}
          >
            M
          </motion.div>
          <span className="deg-indicator">DEG</span>
          <span className="fix-indicator">FIX</span>
        </div>
      </div>
      
      {/* Main display area */}
      <motion.div 
        className="display"
        key={value}
        initial={{ scale: 1.02, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        {selectedMode === 0 ? value : getModeDisplay(selectedMode, value)}
      </motion.div>
      
      {/* Expression/status line */}
      <motion.div 
        className="expression"
        animate={{ opacity: expression ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
      >
        {selectedMode === 0 ? (expression || 'Ready') : getModeStatus(selectedMode)}
      </motion.div>
    </motion.div>
  );
};

// Helper functions for different modes
const getModeDisplay = (modeIndex, value) => {
  switch (modeIndex) {
    case 1: // Equation
      return 'X = ?';
    case 2: // Table
      return 'f(x) = ';
    default:
      return value;
  }
};

const getModeStatus = (modeIndex) => {
  switch (modeIndex) {
    case 1: // Equation
      return 'Enter equation';
    case 2: // Table
      return 'Define function';
    default:
      return 'Ready';
  }
};

export default Display;