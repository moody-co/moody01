import { colors } from '../../theme/colors';
import { PlaceCard } from '../../components/PlaceCard';
import { FaMapMarkerAlt, FaCompass, FaTicketAlt, FaUser } from 'react-icons/fa';

export const HomeScreen = () => {
  return (
    <div style={{
      backgroundColor: '#000',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      
      {/* HEADER REFINADO */}
      <div style={{
        padding: '60px 24px 10px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
            Location
          </span>
          <h2 style={{ fontSize: '24px', margin: '4px 0 0 0', color: '#fff', fontWeight: 'bold' }}>
            São Paulo, SP
          </h2>
        </div>

        <button style={{
          backgroundColor: '#121212',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
          padding: '10px 18px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          <FaMapMarkerAlt size={14} /> Map
        </button>
      </div>

      {/* FEED (Scrollable) */}
      <div style={{ 
        flex: 1, 
        padding: '20px 24px 120px 24px', 
        overflowY: 'auto'
      }}>
        <PlaceCard 
          name="Villa Mix"
          location="Vila Olímpia, SP"
          liveCount={452}
          temperature="Hot"
          image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800"
        />
        <PlaceCard 
          name="Audio Club"
          location="Barra Funda, SP"
          liveCount={280}
          temperature="Warm"
          image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800"
        />
      </div>

      {/* BOTTOM NAV BAR FLUTUANTE */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '88%',
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '16px 0',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 1000
      }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <FaCompass size={22} />
          <p style={{ fontSize: '10px', margin: '4px 0 0 0' }}>Discovery</p>
        </div>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
          <FaTicketAlt size={22} />
          <p style={{ fontSize: '10px', margin: '4px 0 0 0' }}>Tickets</p>
        </div>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
          <FaUser size={22} />
          <p style={{ fontSize: '10px', margin: '4px 0 0 0' }}>Profile</p>
        </div>
      </div>
    </div>
  );
};