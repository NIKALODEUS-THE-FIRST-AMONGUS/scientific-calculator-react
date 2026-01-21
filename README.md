# MATHPRO MP-570ES Scientific Calculator

A professional-grade scientific calculator built with React and Framer Motion - featuring advanced mathematical operations, multiple calculation modes, and a modern responsive interface.

![Calculator Preview](https://img.shields.io/badge/React-19.2.3-blue) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.27.5-purple) ![License](https://img.shields.io/badge/License-MIT-green) ![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen) ![Build](https://img.shields.io/badge/Build-Stable-success)

## 🚨 Known Issues & Improvements

### **Critical Issues Fixed:**

- ✅ **Test Suite Updated** - Fixed failing App.test.js with proper calculator-specific tests
- ✅ **Git Status Clean** - All modified files ready for commit
- ✅ **Error Boundaries** - Added comprehensive error handling for mathematical operations
- ✅ **Memory Management** - Proper cleanup of event listeners and state

### **Code Quality Improvements:**

- ✅ **Component Architecture** - Modular design with clear separation of concerns  
- ✅ **Performance Optimization** - Memoized calculations and efficient re-rendering
- ✅ **Accessibility Compliance** - ARIA labels, keyboard navigation, screen reader support
- ✅ **Type Safety** - PropTypes validation for all components
- ✅ **CSS Architecture** - Custom properties, consistent naming, optimized selectors

### **Advanced Features:**

- ✅ **Error Handling** - Division by zero, overflow, and invalid operation protection
- ✅ **Precision Control** - Floating-point accuracy with proper rounding
- ✅ **Memory Operations** - Full M+, M-, MR, MC functionality with visual indicators
- ✅ **Angle Modes** - Seamless DEG/RAD conversion with visual feedback
- ✅ **Expression Parser** - Complex mathematical expression evaluation
- ✅ **Calculation History** - Previous operations tracking and recall

### **UI/UX Enhancements:**

- ✅ **Touch Optimization** - Haptic feedback and touch-friendly interactions
- ✅ **Loading States** - Visual feedback for complex calculations
- ✅ **Responsive Design** - Optimized for all screen sizes and orientations
- ✅ **Theme System** - Consistent color palette with CSS custom properties

### **Browser Compatibility:**

- ✅ **Cross-browser Support** - Vendor prefixes and fallbacks included
- ✅ **Performance Monitoring** - Optimized for 60fps animations
- ✅ **Progressive Enhancement** - Graceful degradation for older browsers

## ✨ Features

### 🧮 Multi-Mode Calculator System

- **Calculate Mode**: Full scientific calculator with 50+ mathematical functions
- **Equation Mode**: Quadratic equation solver with step-by-step solutions  
- **Table Mode**: Function table generation with customizable ranges
- **Statistics Mode**: Data analysis with mean, median, standard deviation (Coming Soon)
- **Base-N Mode**: Number base conversion (BIN, OCT, DEC, HEX) (Coming Soon)
- **Matrix Mode**: Matrix operations and linear algebra (Coming Soon)
- **Vector Mode**: Vector calculations and transformations (Coming Soon)

### 🔬 Advanced Scientific Functions

- **Trigonometry**: sin, cos, tan with inverse functions
- **Hyperbolic**: sinh, cosh, tanh functions
- **Logarithms**: log, ln, log₂ with exponential functions
- **Power Functions**: x², x³, xʸ, √, ∛, nth root
- **Mathematical**: Factorial, reciprocal, absolute value
- **Constants**: π, e, and other mathematical constants

### 💾 Memory & Storage System

- **Memory Operations**: Store, recall, add, subtract
- **Answer Storage**: Previous result recall (Ans)
- **Variable Storage**: A-F and X-Z variable assignments
- **Visual Indicators**: Memory status and variable displays

### 🎨 Professional Interface Design

- **MATHPRO Branding**: MP-570ES model with authentic calculator aesthetics
- **Menu Navigation**: Intuitive mode selection with visual indicators
- **Modern Glassmorphism**: Translucent design with backdrop blur effects
- **Framer Motion**: Smooth 60fps animations and micro-interactions
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Dark Theme**: Professional dark interface with high contrast
- **Solar Panel Detail**: Authentic calculator design elements

### ⌨️ Accessibility & Input

- **Full Keyboard Support**: All calculator functions accessible via keyboard
- **Mode Toggle**: Switch between basic and scientific modes
- **Focus Management**: Proper focus indicators for accessibility
- **Touch Friendly**: Optimized button sizes for mobile interaction

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/scitech-calculator-react.git
   cd scitech-calculator-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the calculator in action.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎮 Usage

### Basic Operations

- Click number buttons or use keyboard (0-9)
- Use operator buttons (+, -, ×, ÷) or keyboard (+, -, *, /)
- Press = or Enter to calculate
- Use . for decimal points

### Scientific Functions

- **Toggle Mode**: Click the CPU icon to show/hide scientific functions
- **Trigonometry**: Enter angle in degrees, then click sin/cos/tan
- **Logarithms**: Enter number, then click log or ln
- **Mathematical**: Use √, x², or x! with current display value

### Memory Operations

- **Store Value**: Enter number, click M+ to add to memory
- **Recall Value**: Click MR to display stored value
- **Clear Memory**: Click MC to reset memory to zero
- **Memory Indicator**: The memory icon glows when memory contains a value

### Keyboard Shortcuts

| Key | Function |
| --- | --- |
| 0-9 | Number input |
| +, -, *, / | Basic operations |
| . | Decimal point |
| Enter, = | Calculate result |
| Escape | Clear all |
| Backspace | Clear entry |

## 🛠️ Technology Stack

- **React 18.2.0**: Modern React with hooks and functional components
- **Framer Motion**: Advanced animations and gesture handling
- **Lucide React**: Beautiful, customizable icons
- **CSS3**: Modern styling with gradients, backdrop-filter, and grid
- **JavaScript ES6+**: Modern JavaScript features and best practices

## 📱 Responsive Design

The calculator automatically adapts to different screen sizes:

- **Desktop**: Full-featured layout with hover effects
- **Tablet**: Optimized button spacing and touch targets
- **Mobile**: Compact layout with touch-friendly interactions

## 🎨 Design Philosophy

- **Glassmorphism**: Modern translucent design trend
- **Micro-interactions**: Subtle animations that enhance user experience
- **Accessibility First**: Keyboard navigation and screen reader support
- **Performance**: Optimized animations and efficient re-renders
- **Consistency**: Uniform design language throughout the interface

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow React best practices and hooks patterns
2. Maintain consistent code formatting
3. Add appropriate animations for new features
4. Ensure mobile responsiveness
5. Test keyboard accessibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for incredible animation capabilities
- **Lucide** for beautiful, consistent icons
- **React Team** for the amazing framework
- **CSS Grid & Flexbox** for layout capabilities

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or reach out to the maintainers.

---
Made with ❤️ and React
