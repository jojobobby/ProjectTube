import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders login page and logs in user', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Check if the login page is rendered
  expect(screen.getByText(/Login to ProjectTube/i)).toBeInTheDocument();

  // Simulate login
  fireEvent.click(screen.getByText(/Login with Google/i));

  // Check if the video editor page is rendered
  expect(screen.getByText(/Video Uploader & Editor/i)).toBeInTheDocument();
});

test('persists user state across reloads', () => {
  // Set a dummy user in localStorage
  localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email: 'john.doe@example.com' }));

  render(
    <Router>
      <App />
    </Router>
  );

  // Check if the video editor page is rendered
  expect(screen.getByText(/Video Uploader & Editor/i)).toBeInTheDocument();

  // Clean up
  localStorage.removeItem('user');
});
