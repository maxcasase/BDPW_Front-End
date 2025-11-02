// /src/pages/SearchPage.tsx

import React, { useState } from 'react';
import type { IAlbum } from '../interfaces/album.interfaces'; // Usamos 'import type'

// --- Estilos para el Formulario ---
const formStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  border: '1px solid #eee',
  marginBottom: '2rem',
};
const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  flex: '1 1 150px', // Responsive
};
const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '0.9rem',
};
const inputStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
};
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  alignSelf: 'flex-end',
};
// --- Estilos para los Resultados ---
const resultsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};
const resultItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  padding: '1rem',
  backgroundColor: '#fff',
  border: '1px solid #eee',
  borderRadius: '8px',
  alignItems: 'center',
};
const coverArtStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '4px',
  backgroundColor: '#ccc',
};
// --- Fin Estilos ---


// --- DATOS SIMULADOS ---
// (En el futuro, esto vendrá de la API)
const mockResults: IAlbum[] = [
  { id_album: 1, titulo: 'Album Simulado 1', genero_principal: 'Rock' },
  { id_album: 2, titulo: 'Un Álbum de Pop', genero_principal: 'Pop' },
  { id_album: 3, titulo: 'Disco de Jazz', genero_principal: 'Jazz' },
];
// -------------------------


const SearchPage = () => {
  // 1. Estados para cada filtro
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState('');

  // 2. Estado para los resultados
  const [results, setResults] = useState<IAlbum[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // 3. Función de envío (simulada)
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filters = { searchTerm, genre, year, artist };
    
    console.log('Buscando con filtros:', filters);
    
    // --- SIMULACIÓN DE BÚSQUEDA ---
    // (Aquí iría la llamada a la API con React Query o useEffect)
    // Por ahora, solo mostramos los datos simulados
    setResults(mockResults);
    setHasSearched(true);
  };

  return (
    <>
      <h1 style={{ marginBottom: '1rem' }}>Búsqueda Avanzada</h1>
      <p style={{ color: '#555', marginBottom: '2rem' }}>
        Encuentra música por nombre, artista, género o año.
      </p>

      {/* --- FORMULARIO DE BÚSQUEDA (RF 49) --- */}
      <form onSubmit={handleSearch} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="search" style={labelStyle}>Buscar por nombre</label>
          <input
            id="search"
            type="text"
            style={inputStyle}
            placeholder="Nombre de álbum o canción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="artist" style={labelStyle}>Artista</label>
          <input
            id="artist"
            type="text"
            style={inputStyle}
            placeholder="Nombre del artista..."
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="genre" style={labelStyle}>Género</label>
          <input
            id="genre"
            type="text"
            style={inputStyle}
            placeholder="Ej. Rock, Pop, Jazz..."
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="year" style={labelStyle}>Año</label>
          <input
            id="year"
            type="number" // Usamos 'number' para el año
            style={inputStyle}
            placeholder="Ej. 1991"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit" style={buttonStyle}>Buscar</button>
      </form>

      {/* --- SECCIÓN DE RESULTADOS --- */}
      <div style={resultsListStyle}>
        {results.length > 0 && <h2>Resultados de la Búsqueda</h2>}
        
        {results.map((album) => (
          <div key={album.id_album} style={resultItemStyle}>
            <div style={coverArtStyle}></div> {/* Portada simulada */}
            <div>
              <h3 style={{ margin: 0 }}>{album.titulo}</h3>
              <p style={{ margin: 0, color: '#555' }}>{album.genero_principal}</p>
            </div>
          </div>
        ))}
        
        {/* Mensaje si no hay resultados */}
        {hasSearched && results.length === 0 && (
          <p>No se encontraron resultados (simulado).</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;