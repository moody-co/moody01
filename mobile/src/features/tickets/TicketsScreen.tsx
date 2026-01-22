import { useMemo, useState } from 'react'
import { FiClock, FiMapPin, FiMoreHorizontal, FiCalendar } from 'react-icons/fi'

type TicketStatus = 'ACTIVE' | 'CONFIRMED'
type TicketBadge = 'HOT' | 'FREE ENTRY'

type Ticket = {
  id: string
  title: string
  venue: string
  dateLabel: string
  status: TicketStatus
  badge?: TicketBadge
  // imagem do evento (pode ser url real depois)
  coverUrl?: string
}

const Pill = ({
  children,
  variant = 'neutral',
}: {
  children: React.ReactNode
  variant?: 'neutral' | 'purple' | 'green' | 'red'
}) => {
  const map: Record<string, { bg: string; border: string; color: string }> = {
    neutral: {
      bg: 'rgba(255,255,255,0.06)',
      border: 'rgba(255,255,255,0.12)',
      color: 'rgba(255,255,255,0.85)',
    },
    purple: {
      bg: 'rgba(168,85,247,0.18)',
      border: 'rgba(168,85,247,0.55)',
      color: 'rgba(216,180,254,0.95)',
    },
    green: {
      bg: 'rgba(34,197,94,0.14)',
      border: 'rgba(34,197,94,0.45)',
      color: 'rgba(134,239,172,0.95)',
    },
    red: {
      bg: 'rgba(239,68,68,0.14)',
      border: 'rgba(239,68,68,0.45)',
      color: 'rgba(252,165,165,0.95)',
    },
  }

  const c = map[variant]

  return (
    <div
      style={{
        height: 20,
        padding: '0 10px',
        borderRadius: 999,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 9,
        fontWeight: 400,
        letterSpacing: 0.9,
        border: `1px solid ${c.border}`,
        background: c.bg,
        color: c.color,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </div>
  )
}

const TicketCard = ({
  ticket,
  onView,
  onDetails,
  onAddCalendar,
}: {
  ticket: Ticket
  onView: () => void
  onDetails: () => void
  onAddCalendar: () => void
}) => {
  const isHot = ticket.badge === 'HOT'
  const isFree = ticket.badge === 'FREE ENTRY'

  const statusVariant = ticket.status === 'ACTIVE' ? 'purple' : 'green'

  const coverBg = ticket.coverUrl
    ? `url(${ticket.coverUrl})`
    : 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))'

  return (
    <div
      style={{
        borderRadius: 26,
        padding: 12,
        background:
          'radial-gradient(120% 120% at 50% 0%, rgba(168,85,247,0.16) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 16px 50px rgba(0,0,0,0.55)',
      }}
    >
      {/* Cover */}
      <div
        style={{
          height: 180,
          borderRadius: 20,
          backgroundImage: coverBg,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* overlay suave */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* top badges */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'flex',
            gap: 8,
          }}
        >
          {isHot && <Pill variant="red">HOT</Pill>}
          {isFree && <Pill variant="neutral">FREE ENTRY</Pill>}
        </div>

        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Pill variant={statusVariant}>{ticket.status}</Pill>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '12px 6px 6px' }}>
        <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: -0.2 }}>
          {ticket.title}
        </div>

        <div
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            color: 'rgba(255,255,255,0.70)',
            fontSize: 12.5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FiMapPin size={14} style={{ opacity: 0.85 }} />
            <span>{ticket.venue}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FiClock size={14} style={{ opacity: 0.85 }} />
            <span>{ticket.dateLabel}</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button
            type="button"
            onClick={onView}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 999,
              border: '1px solid rgba(168,85,247,0.55)',
              background: 'rgba(168,85,247,0.95)',
              color: '#fff',
              fontWeight: 800,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            🎟️ View Ticket
          </button>

          <button
            type="button"
            onClick={onDetails}
            style={{
              width: 92,
              height: 40,
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.16)',
              background: 'rgba(255,255,255,0.03)',
              color: 'rgba(255,255,255,0.88)',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Details
          </button>
        </div>

        {/* Add to calendar */}
        <button
          type="button"
          onClick={onAddCalendar}
          style={{
            marginTop: 15,
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 11.5,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <FiCalendar size={13} style={{ opacity: 0.8 }} />
          Add to calendar
        </button>
      </div>
    </div>
  )
}

export const TicketsScreen = () => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  const tickets = useMemo<Ticket[]>(() => {
    const upcoming: Ticket[] = [
      {
        id: 't1',
        title: 'The Neon Party',
        venue: "Jocker’s Bar",
        dateLabel: 'Fri, Oct 24 • 23:00',
        status: 'ACTIVE',
        badge: 'HOT',
      },
      {
        id: 't2',
        title: 'Midnight Session',
        venue: 'House Club',
        dateLabel: 'Sat, Oct 25 • 22:00',
        status: 'CONFIRMED',
        badge: 'FREE ENTRY',
        // se quiser, depois coloca uma url de imagem
        // coverUrl: 'https://...'
      },
    ]

    const past: Ticket[] = [
      {
        id: 'p1',
        title: 'Retro Night',
        venue: 'Downtown Lounge',
        dateLabel: 'Sat, Sep 14 • 21:00',
        status: 'CONFIRMED',
      },
    ]

    return tab === 'upcoming' ? upcoming : past
  }, [tab])

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: '100dvh',
      background: '#000',
      color: '#fff',
      fontFamily: 'Inter, system-ui, Arial',
      padding: 18,
      paddingBottom: 20, // bottom nav já existe fora
      display: 'flex',
      justifyContent: 'center',
    },
    container: { width: '100%', maxWidth: 420 },

    topRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 6,
      marginBottom: 14,
    },
    title: { fontSize: 28, fontWeight: 900, letterSpacing: -0.4 },
    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.10)',
      background: 'rgba(255,255,255,0.04)',
      color: 'rgba(255,255,255,0.85)',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
    },

    tabsWrap: {
      height: 42,
      borderRadius: 999,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.10)',
      padding: 4,
      display: 'flex',
      gap: 6,
      marginBottom: 14,
    },
    tabBtn: {
      flex: 1,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      fontSize: 12,
      fontWeight: 700,
      color: 'rgba(255,255,255,0.55)',
      background: 'transparent',
    },
    tabBtnActive: {
      background: 'rgba(255,255,255,0.08)',
      color: 'rgba(255,255,255,0.92)',
      border: '1px solid rgba(255,255,255,0.10)',
    },

    list: { display: 'flex', flexDirection: 'column', gap: 14 },
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.topRow}>
          <div style={styles.title}>Tickets</div>

          <button
            type="button"
            style={styles.iconBtn}
            onClick={() => {
              // depois: abrir modal de filtros/opções
            }}
            aria-label="Options"
            title="Options"
          >
            <FiMoreHorizontal size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div style={styles.tabsWrap}>
          <button
            type="button"
            style={{
              ...styles.tabBtn,
              ...(tab === 'upcoming' ? styles.tabBtnActive : null),
            }}
            onClick={() => setTab('upcoming')}
          >
            Upcoming
          </button>

          <button
            type="button"
            style={{
              ...styles.tabBtn,
              ...(tab === 'past' ? styles.tabBtnActive : null),
            }}
            onClick={() => setTab('past')}
          >
            Past
          </button>
        </div>

        {/* List */}
        <div style={styles.list}>
          {tickets.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
              onView={() => {
                // depois: rota do ticket ex: navigate(`/tickets/${t.id}`)
              }}
              onDetails={() => {
                // depois: rota de detalhes
              }}
              onAddCalendar={() => {
                // depois: integração com calendário
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
