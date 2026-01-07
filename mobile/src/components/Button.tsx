import { colors } from '../theme/colors';

interface ButtonProps {
  label: string;
  variant: 'social' | 'gradient';
  onClick: () => void;
  icon?: string; // Aqui você pode passar o link da imagem da Apple/Google depois
}

export const Button = ({ label, variant, onClick }: ButtonProps) => {
  const isGradient = variant === 'gradient';

  const style: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px', // Bordas levemente arredondadas (retangular)
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '12px',
    color: colors.textPrimary,
    border: isGradient ? 'none' : `1.5px solid ${colors.border}`,
    background: isGradient ? colors.buttonGradient : 'transparent',
    transition: 'opacity 0.2s',
  };

  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  );
};