import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiSettings,
  FiMapPin,
  FiEdit2,
  FiShare2,
} from 'react-icons/fi'

type StatItem = { value: number | string; label: string }

const Stat = ({ value, label }: StatItem) => {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{label}</div>
    </div>
  )
}

const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="button"
      style={{
        height: 34,
        padding: '0 14px',
        borderRadius: 999,
        border: '1px solid rgba(168, 85, 247, 0.55)',
        background: 'rgba(168, 85, 247, 0.08)',
        color: 'rgba(216, 180, 254, 0.95)',
        fontSize: 12,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export const ProfileScreen = () => {
  const navigate = useNavigate()

  // Mockzinho (depois você liga no backend/auth)
  const user = useMemo(
    () => ({
      name: 'Sarah Mitchell',
      username: '@sarah_m',
      location: 'São Paulo - SP',
      bio: 'Nightlife enthusiast & electronic music lover. Always looking for the next best vibe',
      avatarUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      isOnline: true,
    }),
    [],
  )

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: '100dvh',
      background: '#000',
      color: '#fff',
      fontFamily: 'Inter, system-ui, Arial',
      padding: 18,
      paddingBottom: 96, // espaço do bottom nav
      display: 'flex',
      justifyContent: 'center',
    },
    container: {
      width: '100%',
      maxWidth: 420,
    },
    topBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4,
      marginBottom: 14,
    },
    title: {
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: -0.4,
    },
    topRight: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    onlinePill: {
      height: 28,
      padding: '0 12px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.10)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 12,
      color: 'rgba(255,255,255,0.8)',
    },
    greenDot: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: '#22c55e',
      boxShadow: '0 0 0 3px rgba(34,197,94,0.15)',
    },
    iconBtn: {
      width: 34,
      height: 34,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.10)',
      background: 'rgba(255,255,255,0.04)',
      color: 'rgba(255,255,255,0.85)',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
    },
    card: {
      borderRadius: 28,
      padding: 18,
      background:
        'radial-gradient(120% 120% at 50% 0%, rgba(168,85,247,0.18) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.02) 100%)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 16px 50px rgba(0,0,0,0.6)',
    },
    avatarWrap: {
      width: 78,
      height: 78,
      borderRadius: 999,
      background: 'rgba(255,255,255,0.08)',
      padding: 4,
      margin: '0 auto',
      position: 'relative',
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: 999,
      objectFit: 'cover',
      display: 'block',
    },
    statusBadge: {
      width: 18,
      height: 18,
      borderRadius: 999,
      position: 'absolute',
      right: 2,
      bottom: 2,
      background: '#0b0b0f',
      border: '2px solid rgba(34,197,94,0.9)',
      boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
    },
    name: {
      marginTop: 14,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: -0.2,
    },
    username: {
      marginTop: 6,
      textAlign: 'center',
      fontSize: 14,
      color: 'rgba(255,255,255,0.55)',
    },
    location: {
      marginTop: 8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'rgba(255,255,255,0.65)',
    },
    bio: {
      marginTop: 16,
      textAlign: 'center',
      fontSize: 15,
      lineHeight: 1.15,
      color: 'rgba(255,255,255,0.70)',
      padding: '0 8px',
    },
    actionsRow: {
      display: 'flex',
      gap: 12,
      marginTop: 23,
    },
    primaryBtn: {
      flex: 1,
      height: 42,
      borderRadius: 999,
      border: '1px solid rgba(168,85,247,0.55)',
      background: 'rgba(168,85,247,0.95)',
      color: '#fff',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      cursor: 'pointer',
    },
    secondaryBtn: {
      flex: 1,
      height: 42,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.16)',
      background: 'rgba(255,255,255,0.03)',
      color: 'rgba(255,255,255,0.88)',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      cursor: 'pointer',
    },
    statsCard: {
      marginTop: 12,
      borderRadius: 18,
      padding: '14px 10px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.10)',
      display: 'flex',
      alignItems: 'stretch',
    },
    divider: {
      width: 1,
      background: 'rgba(255,255,255,0.10)',
      margin: '0 6px',
    },
    vibesCard: {
      marginTop: 14,
      borderRadius: 22,
      padding: 16,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.10)',
    },
    vibesTitle: { fontSize: 18, fontWeight: 800, letterSpacing: -0.2 },
    vibesSubtitle: { marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.55)' },
    chipRow: { marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' },

    bottomNav: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '10px 14px 14px',
      background:
        'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.70) 60%, rgba(0,0,0,0) 100%)',
      display: 'flex',
      justifyContent: 'center',
    },
    bottomNavInner: {
      width: '100%',
      maxWidth: 420,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 18px',
      borderRadius: 18,
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
    },
    navItem: {
      width: 92,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      color: 'rgba(255,255,255,0.55)',
      fontSize: 11,
      cursor: 'pointer',
      userSelect: 'none',
    },
    navItemActive: {
      color: 'rgba(168,85,247,0.95)',
    },
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <div style={styles.title}>Profile</div>

          <div style={styles.topRight}>
            <div style={styles.onlinePill}>
              <span style={styles.greenDot} />
              {user.isOnline ? 'Online' : 'Offline'}
            </div>

            <button
              type="button"
              style={styles.iconBtn}
              onClick={() => {
                // depois: navigate('/settings')
              }}
              aria-label="Settings"
              title="Settings"
            >
              <FiSettings size={18} />
            </button>
          </div>
        </div>

        {/* MAIN CARD */}
        <div style={styles.card}>
          <div style={styles.avatarWrap}>
            <img src={user.avatarUrl} alt={user.name} style={styles.avatar} />
            <span style={styles.statusBadge} />
          </div>

          <div style={styles.name}>{user.name}</div>
          <div style={styles.username}>{user.username}</div>

          <div style={styles.location}>
            <FiMapPin size={14} style={{ opacity: 0.75 }} />
            <span>{user.location}</span>
          </div>

          <div style={styles.bio}>
            {user.bio} <span style={{ opacity: 0.7 }}>●</span>
          </div>

          <div style={styles.actionsRow}>
            <button
              type="button"
              style={styles.primaryBtn}
              onClick={() => {
                // depois: navigate('/profile/edit')
              }}
            >
              <FiEdit2 size={16} />
              Edit Profile
            </button>

            <button
              type="button"
              style={styles.secondaryBtn}
              onClick={() => {
                // depois: share link / abrir modal
              }}
            >
              <FiShare2 size={16} />
              Share
            </button>
          </div>
        </div>

        {/* STATS */}
        <div style={styles.statsCard}>
          <Stat value={42} label="Check-ins" />
          <div style={styles.divider} />
          <Stat value={18} label="Reviews" />
          <div style={styles.divider} />
          <Stat value={156} label="Saved" />
        </div>

        {/* YOUR VIBES */}
        <div style={styles.vibesCard}>
          <div style={styles.vibesTitle}>Your Vibes</div>
          <div style={styles.vibesSubtitle}>Personalize your recommendations</div>

          <div style={styles.chipRow}>
            <Chip>Bar / Drinks</Chip>
            <Chip>Club / Party</Chip>
          </div>
        </div>
      </div>
    </div>
  )
}
