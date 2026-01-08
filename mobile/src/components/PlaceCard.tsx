import { FaUserFriends, FaChevronRight, FaFire } from 'react-icons/fa';
import { colors } from '../theme/colors';

interface PlaceCardProps {
  image: string;
  name: string;
  location: string;
  liveCount: number;
  temperature: string;
}

export const PlaceCard = ({ image, name, location, liveCount, temperature }: PlaceCardProps) => {
  return (
    <div style={{ 
      marginBottom: '20px', 
      width: '100%',
      backgroundColor: '#251a38ff', // Cor de fundo solicitada
      borderRadius: '28px', 
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Container da Imagem com Altura Reduzida */}
      <div style={{ position: 'relative', width: '100%', height: '160px' }}>
        <img 
          src={image} 
          alt={name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        
        {/* Overlay Escuro sobre a Imagem */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(18, 5, 39, 0.9) 100%)'
        }} />

        {/* Badge no canto superior direito */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: '#A000C8',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '10px',
          fontWeight: 'bold',
          letterSpacing: '0.5px'
        }}>
          FREE ENTRY
        </div>
      </div>

      {/* Área de Conteúdo Compacta */}
      <div style={{ 
        padding: '16px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        
        <div style={{ flex: 1 }}>
          {/* Título e Badge HOT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
              {name}
            </h3>
            
            <div style={{
              backgroundColor: 'rgba(255, 176, 0, 0.15)',
              color: '#FFB000',
              padding: '2px 6px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '9px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              textTransform: 'uppercase'
            }}>
              <FaFire size={9} />
              {temperature}
            </div>
          </div>

          {/* Localização */}
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            margin: '0 0 8px 0', 
            fontSize: '13px',
            fontWeight: '500'
          }}>
            {location}
          </p>

          {/* Contador de Pessoas */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: 'rgba(255, 255, 255, 0.4)' 
          }}>
            <FaUserFriends size={12} />
            <span style={{ fontSize: '11px' }}>
              {liveCount} people live here
            </span>
          </div>
        </div>

        {/* Ícone de Seta Alinhado à Direita */}
        <div style={{ paddingLeft: '10px' }}>
          <FaChevronRight color="rgba(255, 255, 255, 0.2)" size={16} />
        </div>
      </div>
    </div>
  );
};