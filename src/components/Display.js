import React from 'react';
import { motion } from 'framer-motion';
import './Display.css';

const Display = ({ currentView, modes, menuSelection, selectedMode, value, expression, hasMemory, angleMode, equationStep, equationCoeffs, tableResults }) => {
  
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
          <span className="deg-indicator">{angleMode || 'DEG'}</span>
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
        {selectedMode === 0 ? value : getModeDisplay(selectedMode, value, equationStep, equationCoeffs, tableResults)}
      </motion.div>
      
      {/* Expression/status line */}
      <motion.div 
        className="expression"
        animate={{ opacity: expression ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
      >
        {selectedMode === 0 ? (expression || 'Ready') : getModeStatus(selectedMode, equationStep, tableResults)}
      </motion.div>
    </motion.div>
  );
};

// Helper functions for different modes
const getModeDisplay = (modeIndex, value, equationStep, equationCoeffs, tableResults) => {
  switch (modeIndex) {
    case 1: // Equation
      if (equationStep === 0) return 'Enter a:';
      if (equationStep === 1) return `a=${equationCoeffs.a}, Enter b:`;
      if (equationStep === 2) return `a=${equationCoeffs.a}, b=${equationCoeffs.b}, Enter c:`;
      if (equationStep === 3) return value; // Show solution
      return 'ax² + bx + c = 0';
    case 2: // Table
      if (tableResults && tableResults.length > 0) {
        return `X=${tableResults[0].x}, Y=${tableResults[0].y}`;
      }
      return 'Y = X² + 2X + 1';
    default:
      return value;
  }
};

const getModeStatus = (modeIndex, equationStep, tableResults) => {
  switch (modeIndex) {
    case 1: // Equation
      if (equationStep === 0) return 'Coefficient a';
      if (equationStep === 1) return 'Coefficient b';
      if (equationStep === 2) return 'Coefficient c';
      if (equationStep === 3) return 'Solution found';
      return 'Quadratic solver';
    case 2: // Table
      if (tableResults && tableResults.length > 0) {
        return `${tableResults.length} values calculated`;
      }
      return 'Function table';
    default:
      return 'Ready';
  }
};

export default Display;