// /src/interfaces/album.interfaces.ts

// Basado en la "Figura 6. Tabla álbum"

export interface IAlbum {
  id_album: number;
  titulo: string;
  fecha_lanzamiento?: string;
  tipo?: string;
  genero_principal?: string;
  duracion_total?: number;
  portada_url?: string;
  descripcion?: string;
  sello_discografico?: string;
}