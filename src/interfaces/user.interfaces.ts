// /src/interfaces/user.interfaces.ts

// Basado en la "Figura 4. Tabla Usuario" del documento

export interface IUser {
  id_usuario: number;
  username: string;
  email: string;
  password_hash: string;
  fecha_registro: string;
  fecha_nacimiento?: string;
  pais?: string;
  ciudad?: string;
  biografia?: string;
  avatar_url?: string;
  activo: boolean;
}