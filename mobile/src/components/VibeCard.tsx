import { colors } from '../theme/colors';
import type { ReactNode } from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface VibeCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  accentColor: string; 
  onClick: () => void;
}

export const VibeCard = ({ title, subtitle, icon, accentColor, onClick }: VibeCardProps) => {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '22px', // Aumentado de 16px para 22px
        marginBottom: '20px', // Mais espaço entre os cards
        borderRadius: '24px', // Borda um pouco mais arredondada
        cursor: 'pointer',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(255, 255, 255, 0.03)', 
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderLeft: `8px solid ${accentColor}`, // Barra lateral mais grossa
      }}
    >
      {/* Container do Ícone Maior */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        padding: '16px', // Aumentado
        borderRadius: '16px',
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: accentColor
      }}>
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ 
          color: colors.textPrimary, 
          margin: 0, 
          fontSize: '22px', // Fonte aumentada
          fontWeight: 'bold' 
        }}>
          {title}
        </h3>
        <p style={{ 
          color: colors.textSecondary, 
          margin: '6px 0 0 0', 
          fontSize: '14px' // Fonte aumentada
        }}>
          {subtitle}
        </p>
      </div>

      <FaChevronRight color="rgba(255, 255, 255, 0.2)" size={18} />
    </div>
  );
};