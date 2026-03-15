/**
 * main.jsx
 * Punto de entrada de la aplicación React + Vite.
 */

import { StrictMode } from 'react';
import { createRoot }  from 'react-dom/client';
import './styles/index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
