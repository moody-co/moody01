import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';



export const LoginScreen = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      backgroundColor: colors.background,
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '180px 24px 40px 24px',
      width: '100%',
    }}>
      
      {/* Bloco do Topo */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h1 style={{ 
          color: colors.textPrimary, 
          fontSize: '40px', 
          margin: '0 ', 
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

      {/* Bloco de Botões */}
      <div style={{ 
        width: '80%', 
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '100px'
      }}>
        
        {/* ALTERAÇÃO AQUI: Adicionamos o icon={<FaApple />} */}
        <Button 
          variant="social" 
          label="Continue with apple" 
          icon={<FaApple />} 
          onClick={() => {}} 
        />

        {/* ALTERAÇÃO AQUI: Adicionamos o icon={<FaGoogle />} */}
        <Button 
          variant="social" 
          label="Continue with google" 
          icon={<FcGoogle/>} 
          onClick={() => {}} 
        />

        {/* Divisor OR */}
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

        <Button variant="gradient" label="Continue with email" onClick={() => navigate('/auth/vibes')} />

        <p style={{ 
          color: colors.textSecondary, 
          fontSize: '11px', 
          textAlign: 'center', 
          marginTop: '24px',
          lineHeight: '1.5' 
        }}>
          By continuing you agree to MOODY's Conditions of Use and Privacy<br/>
        </p>
      </div>
    </div>
  );
};