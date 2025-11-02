// /src/components/ui/FeatureCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';

// Definimos las 'props' que recibirá la tarjeta
interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  to: string; // A dónde debe enlazar el botón
}

// --- Estilos para la tarjeta ---
const cardStyle: React.CSSProperties = {
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  padding: '1.5rem',
  textAlign: 'left',
  maxWidth: '350px',
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
};

const descriptionStyle: React.CSSProperties = {
  color: '#555',
  marginBottom: '1.5rem',
  flexGrow: 1, // Para que el botón se alinee abajo
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  textDecoration: 'none',
  textAlign: 'center',
  fontWeight: 'bold',
};
// --- Fin de Estilos ---

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  buttonText,
  to,
}) => {
  return (
    <div style={cardStyle}>
      <div>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descriptionStyle}>{description}</p>
      </div>
      <Link to={to} style={buttonStyle}>
        {buttonText}
      </Link>
    </div>
  );
};