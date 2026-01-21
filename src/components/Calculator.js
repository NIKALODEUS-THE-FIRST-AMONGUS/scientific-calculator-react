import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

const Calculator = () => {
  // Main calculator state
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory] = useState(0);
  const [expression, setExpression] = useState('');
  const [shiftMode, setShiftMode] = useState(false);
  
  // Mode system state
  const [currentView, setCurrentView] = useState('menu'); // 'menu' or 'mode'
  const [selectedMode, setSelectedMode] = useState(0);
  const [menuSelection, setMenuSelection] = useState(0);

  // Available modes (7 total, 3 implemented)
  const modes = useMemo(() => [
    { name: 'Calculate', icon: '🔢', implemented: true },
    { name: 'Equation', icon: '📐', implemented: true },
    { name: 'Table', icon: '📊', implemented: true },
    { name: 'Statistics', icon: '📈', implemented: false },
    { name: 'Base-N', icon: '🔢', implemented: false },
    { name: 'Matrix', icon: '⬜', implemented: false },
    { name: 'Vector', icon: '➡️', implemented: false }
  ], []);

  const formatNumber = useCallback((num) => {
    if (num === '') return '0';
    
    const number = parseFloat(num);
    if (isNaN(number)) return 'Error';
    
    if (Math.abs(number) > 1e12 || (Math.abs(number) < 1e-6 && number !== 0)) {
      return number.toExponential(4);
    }
    
    const formatted = number.toString();
    if (formatted.length > 10) {
      return parseFloat(number.toPrecision(8)).toString();
    }
    
    return formatted;
  }, []);

  const performCalculation = useCallback((firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : NaN;
      case '^':
        return Math.pow(firstOperand, secondOperand);
      default:
        return secondOperand;
    }
  }, []);

  const appendNumber = useCallback((digit) => {
    if (currentView !== 'mode' || selectedMode !== 0) return;
    
    if (waitingForOperand) {
      setCurrentInput(digit);
      setWaitingForOperand(false);
    } else {
      setCurrentInput(currentInput === '0' ? digit : currentInput + digit);
    }
  }, [currentInput, waitingForOperand, currentView, selectedMode]);

  const appendDecimal = useCallback(() => {
    if (currentView !== 'mode' || selectedMode !== 0) return;
    
    if (waitingForOperand) {
      setCurrentInput('0.');
      setWaitingForOperand(false);
    } else if (currentInput.indexOf('.') === -1) {
      setCurrentInput(currentInput + '.');
    }
  }, [currentInput, waitingForOperand, currentView, selectedMode]);

  const appendOperator = useCallback((nextOperator) => {
    if (currentView !== 'mode' || selectedMode !== 0) return;
    
    const inputValue = parseFloat(currentInput);

    if (previousInput === '') {
      setPreviousInput(inputValue);
    } else if (operator) {
      const currentValue = previousInput || 0;
      const newValue = performCalculation(currentValue, inputValue, operator);
      
      setCurrentInput(String(newValue));
      setPreviousInput(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
    setExpression(`${formatNumber(previousInput || inputValue)} ${nextOperator}`);
  }, [currentInput, previousInput, operator, formatNumber, performCalculation, currentView, selectedMode]);

  const calculate = useCallback(() => {
    if (currentView !== 'mode' || selectedMode !== 0) return;
    
    const inputValue = parseFloat(currentInput);

    if (previousInput !== '' && operator) {
      const newValue = performCalculation(previousInput, inputValue, operator);
      
      setCurrentInput(String(newValue));
      setPreviousInput('');
      setOperator('');
      setWaitingForOperand(true);
      setExpression('');
    }
  }, [currentInput, previousInput, operator, performCalculation, currentView, selectedMode]);

  const clearAll = useCallback(() => {
    setCurrentInput('0');
    setPreviousInput('');
    setOperator('');
    setWaitingForOperand(false);
    setExpression('');
  }, []);

  const scientificFunction = useCallback((func) => {
    if (currentView !== 'mode' || selectedMode !== 0) return;
    
    const inputValue = parseFloat(currentInput);
    let result;

    try {
      switch (func) {
        case 'sin':
          result = Math.sin(inputValue * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(inputValue * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(inputValue * Math.PI / 180);
          break;
        case 'log':
          result = inputValue > 0 ? Math.log10(inputValue) : NaN;
          break;
        case 'ln':
          result = inputValue > 0 ? Math.log(inputValue) : NaN;
          break;
        case 'sqrt':
          result = inputValue >= 0 ? Math.sqrt(inputValue) : NaN;
          break;
        case 'pow':
          result = Math.pow(inputValue, 2);
          break;
        case 'reciprocal':
          result = inputValue !== 0 ? 1 / inputValue : NaN;
          break;
        default:
          result = inputValue;
      }

      if (isNaN(result) || !isFinite(result)) {
        setCurrentInput('Error');
      } else {
        setCurrentInput(String(result));
      }
      
      setWaitingForOperand(true);
    } catch (error) {
      setCurrentInput('Error');
    }
  }, [currentInput, currentView, selectedMode]);

  // Navigation functions
  const handleMenuNavigation = useCallback((direction) => {
    if (currentView === 'menu') {
      if (direction === 'up') {
        setMenuSelection(prev => prev > 0 ? prev - 1 : modes.length - 1);
      } else if (direction === 'down') {
        setMenuSelection(prev => prev < modes.length - 1 ? prev + 1 : 0);
      }
    }
  }, [currentView, modes.length]);

  const handleOK = useCallback(() => {
    if (currentView === 'menu') {
      if (modes[menuSelection].implemented) {
        setSelectedMode(menuSelection);
        setCurrentView('mode');
        clearAll();
      }
    }
  }, [currentView, menuSelection, modes, clearAll]);

  const handleMenu = useCallback(() => {
    setCurrentView('menu');
    setMenuSelection(0);
    clearAll();
  }, [clearAll]);

  const toggleShift = useCallback(() => {
    setShiftMode(!shiftMode);
  }, [shiftMode]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      
      if (currentView === 'menu') {
        if (key === 'ArrowUp') {
          event.preventDefault();
          handleMenuNavigation('up');
        } else if (key === 'ArrowDown') {
          event.preventDefault();
          handleMenuNavigation('down');
        } else if (key === 'Enter') {
          event.preventDefault();
          handleOK();
        }
        return;
      }
      
      if ('0123456789+-*/.='.includes(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault();
      }
      
      if ('0123456789'.includes(key)) {
        appendNumber(key);
      }
      
      switch (key) {
        case '+':
          appendOperator('+');
          break;
        case '-':
          appendOperator('-');
          break;
        case '*':
          appendOperator('*');
          break;
        case '/':
          appendOperator('/');
          break;
        case '.':
          appendDecimal();
          break;
        case 'Enter':
        case '=':
          calculate();
          break;
        case 'Escape':
          clearAll();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [appendNumber, appendOperator, appendDecimal, calculate, clearAll, currentView, handleMenuNavigation, handleOK]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="calculator-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="calculator">
        {/* Calculator Header */}
        <motion.div 
          className="calculator-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="brand-info">
            <div className="brand-logo">MATHPRO</div>
            <div className="model-number">MP-570ES</div>
          </div>
          <div className="solar-panel"></div>
        </motion.div>

        <div className="tech-label">SCIENTIFIC</div>

        {/* Display with Mode System */}
        <Display 
          currentView={currentView}
          modes={modes}
          menuSelection={menuSelection}
          selectedMode={selectedMode}
          value={formatNumber(currentInput)}
          expression={expression}
          hasMemory={memory !== 0}
        />

        {/* Calculator Buttons - Same for all modes */}
        <motion.div 
          className="calculator-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Row 1: Function buttons */}
          <div className="button-row">
            <Button type="function-small" onClick={toggleShift} className={shiftMode ? 'active' : ''}>SHIFT</Button>
            <Button type="function-small" onClick={() => {}}>ALPHA</Button>
            <Button type="function-small" onClick={handleMenu}>MENU</Button>
            <Button type="function-small" onClick={() => {}}>ON</Button>
          </div>

          {/* Row 2: Scientific functions */}
          <div className="button-row">
            <Button type="scientific" onClick={() => scientificFunction(shiftMode ? 'reciprocal' : 'sqrt')}>
              <div className="button-main">√</div>
              <div className="button-shift">x⁻¹</div>
            </Button>
            <Button type="scientific" onClick={() => scientificFunction(shiftMode ? 'pow3' : 'pow')}>
              <div className="button-main">x²</div>
              <div className="button-shift">x³</div>
            </Button>
            <Button type="scientific" onClick={() => scientificFunction(shiftMode ? '10x' : 'log')}>
              <div className="button-main">log</div>
              <div className="button-shift">10ˣ</div>
            </Button>
            <Button type="scientific" onClick={() => scientificFunction(shiftMode ? 'ex' : 'ln')}>
              <div className="button-main">ln</div>
              <div className="button-shift">eˣ</div>
            </Button>
            <Button type="operator" onClick={() => {}}>
              <div className="button-main">(-)</div>
              <div className="button-shift">ANS</div>
            </Button>
          </div>

          {/* Row 3: Trigonometric functions */}
          <div className="button-row">
            <Button type="scientific" onClick={() => scientificFunction(shiftMode ? 'asin' : 'sin')}>
              <div className="button-main">sin</div>
              <div className="button-shift">sin⁻¹</div>
            </Button>
            <Button type="scientific" onClick={() => scientificFunction(shiftMode ? 'acos' : 'cos')}>
              <div className="button-main">cos</div>
              <div className="button-shift">cos⁻¹</div>
            </Button>
            <Button type="scientific" onClick={() => scientificFunction(shiftMode ? 'atan' : 'tan')}>
              <div className="button-main">tan</div>
              <div className="button-shift">tan⁻¹</div>
            </Button>
            <Button type="scientific" onClick={() => {}}>
              <div className="button-main">DRG</div>
              <div className="button-shift">DRG▶</div>
            </Button>
            <Button type="clear" onClick={clearAll}>
              <div className="button-main">AC</div>
              <div className="button-shift">OFF</div>
            </Button>
          </div>

          {/* Row 4: Navigation and advanced functions */}
          <div className="button-row">
            <Button type="function" onClick={() => {}}>
              <div className="button-main">RCL</div>
              <div className="button-shift">STO</div>
            </Button>
            <Button type="function" onClick={() => {}}>
              <div className="button-main">ENG</div>
              <div className="button-shift">←</div>
            </Button>
            <Button type="function" onClick={() => handleMenuNavigation('up')}>
              <div className="button-main">↑</div>
              <div className="button-shift">REPLAY</div>
            </Button>
            <Button type="function" onClick={() => handleMenuNavigation('down')}>
              <div className="button-main">↓</div>
              <div className="button-shift">→</div>
            </Button>
            <Button type="function" onClick={handleOK}>
              <div className="button-main">OK</div>
              <div className="button-shift">SOLVE</div>
            </Button>
          </div>

          {/* Row 5: Numbers and operators */}
          <div className="button-row">
            <Button type="number" onClick={() => appendNumber('7')}>
              <div className="button-main">7</div>
              <div className="button-shift">x!</div>
            </Button>
            <Button type="number" onClick={() => appendNumber('8')}>
              <div className="button-main">8</div>
              <div className="button-shift">nCr</div>
            </Button>
            <Button type="number" onClick={() => appendNumber('9')}>
              <div className="button-main">9</div>
              <div className="button-shift">nPr</div>
            </Button>
            <Button type="operator" onClick={() => appendOperator('/')}>
              <div className="button-main">÷</div>
              <div className="button-shift">%</div>
            </Button>
            <Button type="scientific" onClick={() => {}}>
              <div className="button-main">xʸ</div>
              <div className="button-shift">ˣ√y</div>
            </Button>
          </div>

          {/* Row 6: Numbers and operators */}
          <div className="button-row">
            <Button type="number" onClick={() => appendNumber('4')}>
              <div className="button-main">4</div>
              <div className="button-shift">∫dx</div>
            </Button>
            <Button type="number" onClick={() => appendNumber('5')}>
              <div className="button-main">5</div>
              <div className="button-shift">d/dx</div>
            </Button>
            <Button type="number" onClick={() => appendNumber('6')}>
              <div className="button-main">6</div>
              <div className="button-shift">Σ</div>
            </Button>
            <Button type="operator" onClick={() => appendOperator('*')}>
              <div className="button-main">×</div>
              <div className="button-shift">∠</div>
            </Button>
            <Button type="scientific" onClick={() => {}}>
              <div className="button-main">ab/c</div>
              <div className="button-shift">d/c</div>
            </Button>
          </div>

          {/* Row 7: Numbers and operators */}
          <div className="button-row">
            <Button type="number" onClick={() => appendNumber('1')}>
              <div className="button-main">1</div>
              <div className="button-shift">|x|</div>
            </Button>
            <Button type="number" onClick={() => appendNumber('2')}>
              <div className="button-main">2</div>
              <div className="button-shift">⌊x⌋</div>
            </Button>
            <Button type="number" onClick={() => appendNumber('3')}>
              <div className="button-main">3</div>
              <div className="button-shift">⌈x⌉</div>
            </Button>
            <Button type="operator" onClick={() => appendOperator('-')}>
              <div className="button-main">-</div>
              <div className="button-shift">M-</div>
            </Button>
            <Button type="operator" onClick={() => appendOperator('+')}>
              <div className="button-main">+</div>
              <div className="button-shift">M+</div>
            </Button>
          </div>

          {/* Row 8: Bottom row */}
          <div className="button-row">
            <Button type="number" onClick={() => appendNumber('0')}>
              <div className="button-main">0</div>
              <div className="button-shift">Rnd</div>
            </Button>
            <Button type="number" onClick={appendDecimal}>
              <div className="button-main">.</div>
              <div className="button-shift">Ran#</div>
            </Button>
            <Button type="scientific" onClick={() => {}}>
              <div className="button-main">×10ˣ</div>
              <div className="button-shift">π</div>
            </Button>
            <Button type="scientific" onClick={() => {}}>
              <div className="button-main">Ans</div>
              <div className="button-shift">DMS</div>
            </Button>
            <Button type="equals" onClick={calculate}>
              <div className="button-main">=</div>
              <div className="button-shift">%</div>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Calculator;