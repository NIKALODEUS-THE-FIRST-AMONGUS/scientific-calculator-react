import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator app', () => {
  render(<App />);
  const calculatorElement = screen.getByText(/MATHPRO/i);
  expect(calculatorElement).toBeInTheDocument();
});

test('renders main menu', () => {
  render(<App />);
  const menuElement = screen.getByText(/Main Menu/i);
  expect(menuElement).toBeInTheDocument();
});

test('renders calculate mode option', () => {
  render(<App />);
  const calculateOption = screen.getByText(/Calculate/i);
  expect(calculateOption).toBeInTheDocument();
});
