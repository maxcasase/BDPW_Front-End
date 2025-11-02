// /src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Herramienta de depuración

import App from './App.tsx';
import queryClient from './lib/queryClient.ts'; // Nuestro cliente de Query
import './index.css'; // O tu archivo de estilos globales

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 1. Proveedor de React Query (para caché y rendimiento) */}
    <QueryClientProvider client={queryClient}>
      
      {/* 2. Proveedor de React Router (para navegación SPA) */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
      {/* 3. (Opcional) Herramientas de depuración para React Query */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);