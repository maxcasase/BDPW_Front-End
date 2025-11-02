// /src/lib/queryClient.ts

import { QueryClient } from '@tanstack/react-query';

// 1. Creación del Cliente
// Esta instancia manejará todo el caché de datos de la aplicación.
export const queryClient = new QueryClient({
  // 2. Opciones por defecto (Recomendado)
  defaultOptions: {
    queries: {
      // 3. Opciones específicas de las 'queries' (peticiones GET)
      
      // Con 'staleTime', le decimos a React Query que los datos 
      // se consideren "frescos" durante 5 minutos (300,000 ms)
      // antes de volver a pedirlos. Esto reduce drásticamente las llamadas a la API.
      staleTime: 1000 * 60 * 5, // 5 minutos

      // 'refetchOnWindowFocus: false' evita que la app recargue
      // datos cada vez que haces clic fuera y dentro de la ventana 
      // del navegador. Es menos molesto para el desarrollo y la UX.
      refetchOnWindowFocus: false,

      // 'retry: 1' significa que si una petición a la API falla,
      // solo lo reintentará una vez más automáticamente.
      retry: 1,
    },
  },
});

export default queryClient;