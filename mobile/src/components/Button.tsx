import { colors } from '../theme/colors';
import type { ReactNode } from 'react';

interface ButtonProps {
  label: string;
  variant: 'social' | 'gradient';
  onClick: () => void;
  icon?: ReactNode; // Adicionamos suporte a ícones aqui
}

export const Button = ({ label, variant, onClick, icon }: ButtonProps) => {
  const isGradient = variant === 'gradient';

  const style: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px', // Espaço entre o ícone e o texto
    marginBottom: '12px',
    color: colors.textPrimary,
    border: isGradient ? 'none' : `1.2px solid ${colors.border}`,
    background: isGradient ? colors.buttonGradient : 'transparent',
  };

  return (
    <button style={style} onClick={onClick}>
      {icon && <span style={{ display: 'flex', fontSize: '20px', padding: '0 8px' }}>{icon}</span>}
      {label}
    </button>
  );
};