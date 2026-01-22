import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiHeart, FiMapPin, FiClock, FiUsers } from 'react-icons/fi'

type TabKey = 'overview' | 'ratings' | 'reviews'

type Venue = {
  id: string
  name: string
  subtitle: string
  distanceKm: number
  address: string
  isOpenNow: boolean
  closesAt: string
  peopleHereNow: number
  heroUrl: string
  isHot?: boolean
}

const Pill = ({
  children,
  variant = 'purple',
}: {
  children: React.ReactNode
  variant?: 'purple' | 'green' | 'red' | 'neutral'
}) => {
  const map: Record<string, { bg: string; border: string; color: string }> = {
    purple: {
      bg: 'rgba(168,85,247,0.18)',
      border: 'rgba(168,85,247,0.55)',
      color: 'rgba(216,180,254,0.95)',
    },
    green: {
      bg: 'rgba(34,197,94,0.16)',
      border: 'rgba(34,197,94,0.50)',
      color: 'rgba(134,239,172,0.95)',
    },
    red: {
      bg: 'rgba(239,68,68,0.16)',
      border: 'rgba(239,68,68,0.50)',
      color: 'rgba(252,165,165,0.95)',
    },
    neutral: {
      bg: 'rgba(255,255,255,0.07)',
      border: 'rgba(255,255,255,0.12)',
      color: 'rgba(255,255,255,0.85)',
    },
  }

  const c = map[variant]

  return (
    <div
      style={{
        height: 22,
        padding: '0 10px',
        borderRadius: 999,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.6,
        border: `1px solid ${c.border}`,
        background: c.bg,
        color: c.color,
        textTransform: 'uppercase',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  )
}

export const VenueDetailsScreen = () => {
  const navigate = useNavigate()
  const { venueId } = useParams()

  const [tab, setTab] = useState<TabKey>('overview')
  const [liked, setLiked] = useState(false)

  // Mock (depois liga no backend)
  const venue = useMemo<Venue | undefined>(() => {
    if (!venueId) return undefined
    return {
      id: venueId,
      name: 'The Neon Lounge',
      subtitle: 'Nightclub • Electronic • Cocktail Bar',
      distanceKm: 0.4,
      address: 'Rua Augusta, 1230',
      isOpenNow: true,
      closesAt: '5:00 AM',
      peopleHereNow: 128,
      isHot: true,
      heroUrl:
        'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
    }
  }, [venueId])

  if (!venueId || !venue) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100dvh', color: '#fff', padding: 24 }}>
        Local não encontrado.
      </div>
    )
  }

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: '100dvh',
      background: '#000',
      color: '#fff',
      fontFamily: 'Inter, system-ui, Arial',
    },

    hero: {
      height: 230,
      backgroundImage: `url(${venue.heroUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.92) 100%)',
    },
    heroTopBar: {
      position: 'absolute',
      top: 14,
      left: 14,
      right: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 2,
    },
    iconBtn: {
      width: 38,
      height: 38,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.14)',
      background: 'rgba(0,0,0,0.35)',
      backdropFilter: 'blur(8px)',
      color: 'rgba(255, 255, 255, 0.92)',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
    },
    hotPillWrap: {
      position: 'absolute',
      top: 18,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 2,
    },

    card: {
      marginTop: -46,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 18,
      background:
        'radial-gradient(140% 120% at 50% 0%, rgba(168,85,247,0.20) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.02) 100%)',
      borderTop: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 -18px 60px rgba(0,0,0,0.65)',
    },

    sectionLabel: {
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: 900,
      color: 'rgba(255,255,255,0.45)',
      marginTop: 6,
      marginBottom: 10,
    },

    title: {
      fontSize: 34,
      fontWeight: 900,
      letterSpacing: -0.6,
      marginTop: 6,
    },
    subtitle: {
      marginTop: 8,
      fontSize: 14,
      color: 'rgba(255,255,255,0.62)',
    },

    infoRow: {
      marginTop: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 14.5,
      color: 'rgba(255,255,255,0.70)',
    },
    infoLine: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },

    openNow: {
      color: 'rgba(34,197,94,0.95)',
      fontWeight: 600,
    },
    closeText: {
      color: 'rgba(255,255,255,0.55)',
      fontWeight: 500,
    },

    presenceWrap: { marginTop: 14 },

    actionsLabel: {
      marginTop: 18,
      marginBottom: 10,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: 900,
      color: 'rgba(255,255,255,0.45)',
    },

    actionsRow: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
    },
    primaryBtn: {
      flex: 1,
      height: 44,
      borderRadius: 999,
      border: '1px solid rgba(168,85,247,0.55)',
      background: 'rgba(168,85,247,0.95)',
      color: '#fff',
      fontWeight: 800,
      fontSize: 15,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    secondaryBtn: {
      width: 140,
      height: 44,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.16)',
      background: 'rgba(255,255,255,0.03)',
      color: 'rgba(255,255,255,0.88)',
      fontWeight: 900,
      fontSize: 13,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },

    tabsLabel: {
      marginTop: 18,
      marginBottom: 10,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: 900,
      color: 'rgba(255,255,255,0.45)',
    },

    tabsWrap: {
      height: 40,
      borderRadius: 999,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.10)',
      padding: 4,
      display: 'flex',
      gap: 6,
    },
    tabBtn: {
      flex: 1,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 750,
      color: 'rgba(255,255,255,0.55)',
      background: 'transparent',
    },
    tabBtnActive: {
      background: 'rgba(255,255,255,0.08)',
      color: 'rgba(255,255,255,0.92)',
      border: '1px solid rgba(255,255,255,0.10)',
    },

    tabContentLabel: {
      marginTop: 14,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: 900,
      color: 'rgba(255,255,255,0.35)',
    },

    placeholderCard: {
      marginTop: 10,
      borderRadius: 18,
      padding: 14,
      border: '1px solid rgba(255,255,255,0.10)',
      background: 'rgba(255,255,255,0.03)',
      color: 'rgba(255,255,255,0.60)',
      fontSize: 14,
      lineHeight: 1.45,
    },
  }

  const tabLabel =
    tab === 'overview' ? 'OVERVIEW CONTENT' : tab === 'ratings' ? 'RATINGS CONTENT' : 'REVIEWS CONTENT'

  return (
    <div style={styles.page}>
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />

        <div style={styles.heroTopBar}>
          <button type="button" style={styles.iconBtn} onClick={() => navigate(-1)} aria-label="Back">
            <FiArrowLeft size={18} />
          </button>

          <button
            type="button"
            style={styles.iconBtn}
            onClick={() => setLiked((v) => !v)}
            aria-label="Like"
            title="Like"
          >
            <FiHeart size={18} style={{ opacity: liked ? 1 : 0.9 }} />
          </button>
        </div>

        {venue.isHot && (
          <div style={styles.hotPillWrap}>
            <Pill variant="red">HOT</Pill>
          </div>
        )}
      </div>

      {/* CONTENT CARD */}
      <div style={styles.card}>
        <div style={styles.sectionLabel}>HERO &amp; MAIN INFO</div>

        <div style={styles.title}>{venue.name}</div>
        <div style={styles.subtitle}>{venue.subtitle}</div>

        <div style={styles.infoRow}>
          <div style={styles.infoLine}>
            <FiMapPin size={14} style={{ opacity: 0.9 }} />
            <span>
              <b>{venue.distanceKm.toFixed(1)} km away</b> • {venue.address}
            </span>
          </div>

          <div style={styles.infoLine}>
            <FiClock size={14} style={{ opacity: 0.9 }} />
            <span>
              <span style={styles.openNow}>{venue.isOpenNow ? 'Open now' : 'Closed'}</span>
              <span style={{ margin: '0 8px', opacity: 0.35 }}>•</span>
              <span style={styles.closeText}>Closes {venue.closesAt}</span>
            </span>
          </div>

          <div style={styles.infoLine}>
            <FiUsers size={14} style={{ opacity: 0.9 }} />
            <span>
              <b>{venue.peopleHereNow}</b> people here now
            </span>
          </div>
        </div>

        <div style={styles.presenceWrap}>
          <Pill variant="purple">Presence Verified</Pill>
        </div>

        <div style={styles.actionsLabel}>MAIN ACTIONS</div>

        <div style={styles.actionsRow}>
          <button
            type="button"
            style={styles.primaryBtn}
            onClick={() => {
              // depois: check-in/going flow
            }}
          >
            ✨ I&apos;m Going
          </button>

          <button
            type="button"
            style={styles.secondaryBtn}
            onClick={() => {
              // depois: abrir mapa
            }}
          >
            <FiMapPin size={16} />
            Directions
          </button>
        </div>

        <div style={styles.tabsLabel}>TABS: OVERVIEW / RATINGS / REVIEWS</div>

        <div style={styles.tabsWrap}>
          <button
            type="button"
            style={{ ...styles.tabBtn, ...(tab === 'overview' ? styles.tabBtnActive : null) }}
            onClick={() => setTab('overview')}
          >
            Overview
          </button>

          <button
            type="button"
            style={{ ...styles.tabBtn, ...(tab === 'ratings' ? styles.tabBtnActive : null) }}
            onClick={() => setTab('ratings')}
          >
            Ratings
          </button>

          <button
            type="button"
            style={{ ...styles.tabBtn, ...(tab === 'reviews' ? styles.tabBtnActive : null) }}
            onClick={() => setTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div style={styles.tabContentLabel}>TAB 1 — {tabLabel}</div>

        <div style={styles.placeholderCard}>
          Por enquanto deixei esse conteúdo como placeholder pra ficar igual ao protótipo.
          <br />
          <br />
          Próximo passo: a gente implementa cada tab:
          <br />• Overview: descrição, horários, fotos, tags
          <br />• Ratings: médias + categorias
          <br />• Reviews: lista + escrever review
        </div>
      </div>
    </div>
  )
}
