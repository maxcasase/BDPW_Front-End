import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { useAuthStore } from './store/auth.store';

// React Query provider global
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const Init: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initFromStorage = useAuthStore((s) => s.initFromStorage);
  const initialized = useAuthStore((s) => s.initialized);

  useEffect(() => {
    void initFromStorage();
  }, [initFromStorage]);

  if (!initialized) return null;
  return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Init>
          <App />
        </Init>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
