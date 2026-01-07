import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';

export const LoginScreen = () => {
  return (
    <div style={{
      backgroundColor: colors.background,
      minHeight: '100dvh', // Usa a altura dinâmica do dispositivo
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centraliza tudo horizontalmente
      justifyContent: 'space-between', // Joga o título para cima e botões para baixo
      padding: '180px 24px 40px 24px',
      width: '100%',
    }}>
      
      {/* Bloco do Topo */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h1 style={{ 
          color: colors.textPrimary, 
          fontSize: '40px', 
          margin: '0', 
          fontWeight: 'bold',
          letterSpacing: '2px' 
        }}>
          MOODY
        </h1>
        <p style={{ 
          color: colors.textSecondary, 
          marginTop: '110px', 
          fontSize: '14px' 
        }}>
          Login with the best way to connect
        </p>
      </div>

      {/* Bloco de Botões - Centralizado no Container */}
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', // Limita a largura em telas grandes (tablets)
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '100px'
      }}>
        
        {/* Botões Sociais [cite: 9] */}
        <Button variant="social" label="Continue with apple" onClick={() => {}} />
        <Button variant="social" label="Continue with google" onClick={() => {}} />

        {/* Divisor OR [cite: 7] */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          width: '100%', 
          margin: '20px 0' 
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#333' }}></div>
          <span style={{ color: colors.textSecondary, padding: '0 15px', fontSize: '12px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#333' }}></div>
        </div>

        {/* Botão Gradient [cite: 8] */}
        <Button variant="gradient" label="Continue with email" onClick={() => {}} />

        <p style={{ 
          color: colors.textSecondary, 
          fontSize: '11px', 
          textAlign: 'center', 
          marginTop: '24px',
          lineHeight: '1.5' 
        }}>
          By continue you agree with the polity <br/>
          <span style={{ color: colors.textPrimary, fontWeight: 'bold' }}>terms and privaty</span>
        </p>
      </div>
    </div>
  );
};