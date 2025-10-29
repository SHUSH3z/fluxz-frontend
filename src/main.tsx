// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom'; // 1. Importar

// Importe seus estilos globais (se tiver, como o theme.scss)
// import './theme.scss'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Envelopar o App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);