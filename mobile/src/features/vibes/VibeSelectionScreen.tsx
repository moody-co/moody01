import { colors } from '../../theme/colors';
import { VibeCard } from '../../components/VibeCard';
import { FaGlassMartiniAlt, FaMusic, FaUtensils } from 'react-icons/fa';

export const VibeSelectionScreen = () => {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #000000 0%, #000000 40%,#120524 90% , #120524 100% )',
      minHeight: '100dvh',
      padding: '60px 24px', // Mais espaço no topo
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h2 style={{ color: colors.textPrimary, fontSize: '54px', fontWeight: 'bold', margin: 0 }}>MOODY</h2>
      
      <h1 style={{ 
        color: colors.textPrimary, 
        fontSize: '36px', // Título um pouco maior
        marginTop: '30px', // Mais espaço abaixo do logo
        lineHeight: '1.1',
        fontWeight: 'bold',
        maxWidth: '400px'
      }}>
        What do you want<br/>to do tonight?
      </h1>
      
      <p style={{ color: colors.textSecondary, fontSize: '16px', marginTop: '12px', marginBottom: '50px' }}>
        Select a vibe to get started
      </p>

      <VibeCard 
        title="Bar / Drinks"
        subtitle="Cocktails, pubs & lounges"
        accentColor="#A000C8"
        icon={<FaGlassMartiniAlt size={28} />} // Ícone maior
        onClick={() => {}}
      />

      <VibeCard 
        title="Club / Party"
        subtitle="Dance floors & DJs"
        accentColor="#0080FF"
        icon={<FaMusic size={28} />}
        onClick={() => {}}
      />

      <VibeCard 
        title="Food"
        subtitle="Late night bites & dinner"
        accentColor="#FFB000"
        icon={<FaUtensils size={28} />}
        onClick={() => {}}
      />
    </div>
  );
};