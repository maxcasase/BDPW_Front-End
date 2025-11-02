// /src/pages/ProfilePage.tsx

import React from 'react';
import { ProfileHeader } from '../features/profile/ProfileHeader';

const ProfilePage = () => {
  return (
    <>
      {/* 1. Mostramos el cabezal del perfil */}
      <ProfileHeader />

      {/* 2. Aquí irán las pestañas (Listas, Reseñas, etc.) */}
      <div style={{ padding: '2rem' }}>
        <h2>Listas Creadas</h2>
        <p>(Próximamente...)</p>
        
        <h2>Reseñas Recientes</h2>
        <p>(Próximamente...)</p>
      </div>
    </>
  );
};

export default ProfilePage;