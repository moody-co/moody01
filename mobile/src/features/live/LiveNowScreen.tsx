import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiRadio, FiClock, FiChevronRight } from 'react-icons/fi'

type LiveTab = 'all' | 'clubs' | 'bars' | 'restaurants'

type LivePlace = {
  id: string
  name: string
  category: string
  distanceKm: number
  statusLeft: string   // ex: "Full"
  statusMid: string    // ex: "Lively"
  statusRight: string  // ex: "2m ago"
  heroUrl: string
  peakNow?: boolean
}

const ChipTab = ({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 30,
        padding: '0 12px',
        borderRadius: 999,
        border: active ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.08)',
        background: active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
        color: active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
        fontSize: 12,
        fontWeight: 700,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

const Pill = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        height: 22,
        padding: '0 10px',
        borderRadius: 999,
        background: 'rgba(236,72,153,0.16)',
        border: '1px solid rgba(236,72,153,0.45)',
        color: 'rgba(251,207,232,0.95)',
        fontSize: 10,
        fontWeight: 750,
        letterSpacing: 0.6,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        textTransform: 'uppercase',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 99, background: 'rgba(236,72,153,0.95)' }} />
      {children}
    </div>
  )
}

const MiniCard = ({
  title,
  place,
  subtitle,
  timeTag,
  thumbUrl,
  onClick,
}: {
  title: string
  place: string
  subtitle: string
  timeTag: string
  thumbUrl: string
  onClick: () => void
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minWidth: 200,
        maxWidth: 200,
        minHeight: 90,
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.10)',
        background: 'rgba(255,255,255,0.03)',
        padding: 10,
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {/* Time pill (top-right) */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          height: 18,
          padding: '0 8px',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.10)',
          background: 'rgba(255,255,255,0.06)',
          fontSize: 10,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.80)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {timeTag}
      </div>

      {/* Thumbnail */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          backgroundImage: `url(${thumbUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(255,255,255,0.10)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* overlay pra ficar “dark” igual protótipo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 950, color: 'rgba(255,255,255,0.92)' }}>
          {title}
        </div>

        <div style={{ marginTop: 3, fontSize: 13, fontWeight: 400, marginBottom: 8, color: 'rgba(255,255,255,0.70)' }}>
          {place}
        </div>

        <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(34,197,94,0.85)', fontWeight: 750 }}>
          <span style={{ marginRight: 4 }}>↗</span>
          {subtitle}
        </div>
      </div>
    </button>
  )
}


export const LiveNowScreen = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<LiveTab>('all')

  const hero = useMemo<LivePlace>(
    () => ({
      id: 'nebula',
      name: 'Nebula Club',
      category: 'Nightclub',
      distanceKm: 0.3,
      statusLeft: 'Full',
      statusMid: 'Lively',
      statusRight: '2m ago',
      peakNow: true,
      heroUrl:
        'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
    }),
    [],
  )

    const busy = useMemo(
    () => [
        {
        id: 'covoid',
        title: 'COVOID',
        place: 'Tech Bar',
        subtitle: 'Check-ins spiking',
        timeTag: 'Just now',
        thumbUrl:
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=200&q=80',
        },
        {
        id: 'echo',
        title: 'Echo Hall',
        place: 'Live Music',
        subtitle: 'Band started',
        timeTag: '5 min ago',
        thumbUrl:
            'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=200&q=80',
        },
    ],
    [],
    )


  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: '100dvh',
      background: '#000',
      color: '#fff',
      fontFamily: 'Inter, system-ui, Arial',
      padding: 18,
      paddingBottom: 120, // espaço pro bottom nav (já existe fora)
      display: 'flex',
      justifyContent: 'center',
    },
    container: { width: '100%', maxWidth: 420 },

    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
    headerTitle: { fontSize: 28, fontWeight: 950, letterSpacing: -0.4 },
    headerSub: { marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 650 },

    iconBtn: {
      width: 56,
      height: 36,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.10)',
      background: 'rgba(255,255,255,0.04)',
      color: 'rgba(255,255,255,0.85)',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
    },

    tabsRow: {
      marginTop: 16,
      display: 'flex',
      gap: 10,
      overflowX: 'auto',
      paddingBottom: 6,
    },

    heroCard: {
      marginTop: 14,
      borderRadius: 26,
      border: '1px solid rgba(255,255,255,0.10)',
      background:
        'radial-gradient(120% 120% at 50% 0%, rgba(168,85,247,0.18) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.02) 100%)',
      boxShadow: '0 16px 50px rgba(0,0,0,0.55)',
      overflow: 'hidden',
    },

    heroImage: {
      height: 200,
      backgroundImage: `url(${hero.heroUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.85) 100%)',
    },
    peakWrap: { position: 'absolute', top: 12, right: 12 },

    heroContent: { padding: 14 },
    heroTitle: { fontSize: 20, fontWeight: 950, letterSpacing: -0.2 },
    heroMeta: { marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.60)', fontWeight: 650 },

    statusRow: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      fontSize: 15,
      color: 'rgba(255,255,255,0.65)',
      fontWeight: 650,
    },

    actionsRow: { marginTop: 12, display: 'flex', gap: 12 },
    primaryBtn: {
      flex: 1,
      height: 40,
      borderRadius: 999,
      border: '1px solid rgba(168,85,247,0.55)',
      background: 'rgba(168,85,247,0.95)',
      color: '#fff',
      fontWeight: 900,
      fontSize: 17,
      cursor: 'pointer',
    },
    secondaryBtn: {
      width: 120,
      height: 40,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.16)',
      background: 'rgba(255,255,255,0.03)',
      color: 'rgba(255,255,255,0.88)',
      fontWeight: 700,
      fontSize: 16,
      cursor: 'pointer',
    },

    sectionRow: {
      marginTop: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitle: { fontSize: 18, fontWeight: 950, letterSpacing: -0.2 },
    sectionAction: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,0.45)',
      fontWeight: 900,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
    },

    miniScroll: { marginTop: 12, display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 , scrollbarWidth: 'none' ,msOverflowStyle: 'none'  },
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.headerTitle}>Live Termometer</div>
            <div style={styles.headerSub}>What&apos;s happening right now</div>
            
          </div>

          <button
            type="button"
            style={styles.iconBtn}
            onClick={() => {
              // depois: filtros/ajustes do live
            }}
            aria-label="Live options"
            title="Live options"
          >
            <FiRadio size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div style={styles.tabsRow}>
          <ChipTab active={tab === 'all'} onClick={() => setTab('all')}>
            All
          </ChipTab>
          <ChipTab active={tab === 'clubs'} onClick={() => setTab('clubs')}>
            Clubs
          </ChipTab>
          <ChipTab active={tab === 'bars'} onClick={() => setTab('bars')}>
            Bars
          </ChipTab>
          <ChipTab active={tab === 'restaurants'} onClick={() => setTab('restaurants')}>
            Restaurants
          </ChipTab>
        </div>

        {/* Hero Card */}
        <div style={styles.heroCard}>
          <div style={styles.heroImage}>
            <div style={styles.heroOverlay} />
            {hero.peakNow && (
              <div style={styles.peakWrap}>
                <Pill>Peak now</Pill>
              </div>
            )}
          </div>

          <div style={styles.heroContent}>
            <div style={styles.heroTitle}>{hero.name}</div>
            <div style={styles.heroMeta}>
              {hero.category} • {hero.distanceKm.toFixed(1)} km
            </div>

            <div style={styles.statusRow}>
              <span>👥 {hero.statusLeft}</span>
              <span>✨ {hero.statusMid}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FiClock size={13} style={{ opacity: 0.85 }} /> {hero.statusRight}
              </span>
            </div>

            <div style={styles.actionsRow}>
              <button
                type="button"
                style={styles.primaryBtn}
                onClick={() => {
                  // depois: navega para ação imediata (ex: check-in / directions)
                  // por enquanto: ir para detalhes do local
                  navigate(`/app/venues/${hero.id}`)
                }}
              >
                Go now
              </button>

              <button
                type="button"
                style={styles.secondaryBtn}
                onClick={() => navigate(`/app/venues/${hero.id}`)}
              >
                View place
              </button>
            </div>
          </div>
        </div>

        {/* Just got busy */}
        <div style={styles.sectionRow}>
          <div style={styles.sectionTitle}>Just got busy</div>
          <button
            type="button"
            style={styles.sectionAction}
            onClick={() => {
              // depois: ir para lista completa / ver todos
            }}
          >
            <span style={{ opacity: 0.9 }}> </span>
            <FiChevronRight size={16} />
          </button>
        </div>

        <div style={styles.miniScroll}>
          {busy.map((b) => (
            <MiniCard
              key={b.id}
              title={b.title}
              place={b.place}
              subtitle={b.subtitle}
              timeTag={b.timeTag}
              thumbUrl={b.thumbUrl}
              onClick={() => navigate(`/app/venues/${b.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
