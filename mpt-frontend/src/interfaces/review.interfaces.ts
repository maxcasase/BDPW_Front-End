// /src/interfaces/review.interfaces.ts

// Basado en la "Figura 11. Tabla reseña"

export interface IReview {
  id_resena: number;
  puntuacion: number; // INT (0-10)
  titulo?: string;
  contenido?: string;
  fecha_creacion: string; // DATETIME
  fecha_modificacion?: string; // DATETIME
  likes: number;
  dislikes: number;
  id_usuario: number; // FK
  id_album: number; // FK
}