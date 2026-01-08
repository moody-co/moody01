import { colors } from '../../theme/colors';

export const VibeSelectionScreen = () => {
  return (
    <div style={{
      background: colors.backgroundGradient,
      minHeight: '100dvh',
      padding: '60px 24px 24px 24px', // Espaçamento superior e lateral
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // Alinha tudo à esquerda conforme o protótipo
    }}>
      {/* Nome do App */}
      <h2 style={{ 
        color: colors.textPrimary, 
        fontSize: '24px', 
        fontWeight: 'bold', 
        margin: 0,
        letterSpacing: '1px'
      }}>
        MOODY
      </h2>

      {/* Título Principal */}
      <h1 style={{ 
        color: colors.textPrimary, 
        fontSize: '32px', 
        marginTop: '40px', 
        marginBottom: '8px',
        maxWidth: '280px', // Força a quebra de linha como no print
        lineHeight: '1.2'
      }}>
        What do you want to do tonight?
      </h1>

      {/* Subtítulo discreto */}
      <p style={{ 
        color: colors.textSecondary, 
        fontSize: '14px', 
        marginBottom: '40px' 
      }}>
        Select a vibe to get started
      </p>

      {/* Aqui entrarão os containers de Vibes que faremos a seguir */}
    </div>
  );
};