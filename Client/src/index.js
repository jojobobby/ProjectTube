import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter';
import CustomThemeProvider from './ThemeProvider';
import './index.css'; // Import the default styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <AppRouter />
    </CustomThemeProvider>
  </React.StrictMode>
);
