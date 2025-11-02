// /src/App.tsx

import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

// Importamos las páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChartsPage from './pages/ChartsPage';
import DiscoverPage from './pages/DiscoverPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage'; // <-- NUEVO

function App() {
  return (
    <Routes>
      {/* --- Rutas con Layout Principal --- */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route 
        path="/charts" 
        element={
          <MainLayout>
            <ChartsPage />
          </MainLayout>
        } 
      />
      <Route 
        path="/discover" 
        element={
          <MainLayout>
            <DiscoverPage />
          </MainLayout>
        } 
      />
      <Route 
        path="/perfil/:username" 
        element={
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        } 
      />
      
      {/* --- NUEVA RUTA DE BÚSQUEDA --- */}
      <Route 
        path="/search" 
        element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        } 
      />

      {/* --- Rutas sin Layout (Login/Registro) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />


      {/* --- Ruta 404 --- */}
      <Route 
        path="*" 
        element={
          <MainLayout>
            <h2>404 - Página No Encontrada</h2>
            <p>El recurso que buscas no existe.</p>
          </MainLayout>
        } 
      />
    </Routes>
  );
}

export default App;