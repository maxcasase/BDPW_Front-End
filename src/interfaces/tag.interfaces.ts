// /src/interfaces/tag.interfaces.ts

// Basado en la "Figura 10. Tabla etiqueta"

export interface ITag {
  id_etiqueta: number;
  nombre: string;
  descripcion?: string;
  color?: string;
}