// /src/interfaces/artist.interfaces.ts

// Basado en la "Figura 5. Tabla Artista"

export interface IArtist {
  id_artista: number;
  nombre: string;
  nombre_real?: string;
  fecha_formacion?: string;
  fecha_disolucion?: string;
  pais_origen?: string;
  ciudad_origen?: string;
  biografia?: string;
  foto_url?: string;
  tipo?: string;
}