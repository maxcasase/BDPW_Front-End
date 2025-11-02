// /src/interfaces/song.interfaces.ts

// Basado en la "Figura 7. Tabla canción"

export interface ISong {
  id_cancion: number;
  titulo: string;
  numero_pista?: number;
  duracion?: number;
  letra?: string;
  id_album: number; // FK
}