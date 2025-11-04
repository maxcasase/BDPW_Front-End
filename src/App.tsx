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
import SearchPage from './pages/SearchPage';
import EditProfilePage from './pages/EditProfilePage';
import MyListsPage from './pages/MyListsPage';
import CreateListPage from './pages/CreateListPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import WriteReviewPage from './pages/WriteReviewPage';

function App() {
  return (
    <Routes>
      {/* --- Rutas Públicas con Layout Principal --- */}
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
        path="/search" 
        element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        } 
      />

      {/* --- Rutas de Álbum y Reseñas --- */}
      <Route 
        path="/album/:id" 
        element={
          <MainLayout>
            <AlbumDetailPage />
          </MainLayout>
        } 
      />

      <Route 
        path="/album/:id/review" 
        element={
          <MainLayout>
            <WriteReviewPage />
          </MainLayout>
        } 
      />

      {/* --- Rutas de Perfil --- */}
      <Route 
        path="/perfil/:username" 
        element={
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        } 
      />
      
      <Route 
        path="/perfil/editar" 
        element={
          <MainLayout>
            <EditProfilePage />
          </MainLayout>
        } 
      />

      {/* --- Rutas de Listas --- */}
      <Route 
        path="/mis-listas" 
        element={
          <MainLayout>
            <MyListsPage />
          </MainLayout>
        } 
      />
      
      <Route 
        path="/listas/crear" 
        element={
          <MainLayout>
            <CreateListPage />
          </MainLayout>
        } 
      />

      {/* --- Rutas de Autenticación (sin Layout) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* --- Ruta 404 --- */}
      <Route 
        path="*" 
        element={
          <MainLayout>
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem',
              color: 'white' 
            }}>
              <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
              <h2 style={{ marginBottom: '1rem' }}>Página No Encontrada</h2>
              <p style={{ color: '#888', marginBottom: '2rem' }}>
                El recurso que buscas no existe.
              </p>
              <a 
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#646cff',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Volver al Inicio
              </a>
            </div>
          </MainLayout>
        } 
      />
    </Routes>
  );
}

export default App;
