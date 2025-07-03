import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ACA Quiz App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/ACA Quiz App/i);
  expect(headerElement).toBeInTheDocument();
});
