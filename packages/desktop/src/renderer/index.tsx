import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// Create root element if it doesn't exist
const rootElement = document.getElementById('root') || (() => {
  const element = document.createElement('div');
  element.id = 'root';
  document.body.appendChild(element);
  return element;
})();

// Render the app
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);