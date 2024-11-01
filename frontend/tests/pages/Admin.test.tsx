import React from 'react';
import { render, screen } from '@testing-library/react';
import Admin from '../../src/Pages/Admin'; // Adjust the import path if needed

// Test case to check if "Admin Panel" text exists
test('renders Admin Panel title', () => {
  render(<Admin />);
  const titleElement = screen.getByText(/Admin Panel/i);
  expect(titleElement).toBeInTheDocument();
});

// Test case to check if the Delete button exists
test('renders Job List section', () => {
  render(<Admin />);
  const jobListSection = screen.getByText(/Job List/i);
  expect(jobListSection).toBeInTheDocument();
});

