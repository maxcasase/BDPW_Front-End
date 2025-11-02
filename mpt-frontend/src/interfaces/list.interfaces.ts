// /src/interfaces/list.interfaces.ts

// Basado en la "Figura 12. Tabla lista"

export interface IList {
  id_lista: number;
  nombre: string;
  descripcion?: string;
  fecha_creacion: string; // DATE
  publica: boolean;
  orden?: number;
  id_usuario: number; // FK
}