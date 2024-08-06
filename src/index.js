import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root element where the app will be rendered
const container = document.getElementById('root');

// Create a root for rendering
const root = createRoot(container);

// Render the app using React.StrictMode and the new root API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
