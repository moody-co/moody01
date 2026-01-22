import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
  Modal,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg'

type TicketStatus = 'ACTIVE' | 'CONFIRMED'
type TicketBadge = 'HOT' | 'FREE ENTRY'

type Ticket = {
  id: string
  title: string
  venue: string
  dateLabel: string
  status: TicketStatus
  badge?: TicketBadge
  coverUrl?: string
  // payload do QR
  qrValue: string
  codeLabel: string // tipo: "NEON - 248 - XJ9"
}

type TabKey = 'upcoming' | 'past'

const COLORS = {
  bg: '#000',
  text: '#fff',
  muted: 'rgba(255,255,255,0.55)',
  muted2: 'rgba(255,255,255,0.35)',
  border: 'rgba(255,255,255,0.10)',

  pillNeutralBg: 'rgba(255,255,255,0.06)',
  pillNeutralBorder: 'rgba(255,255,255,0.12)',
  pillNeutralText: 'rgba(255,255,255,0.85)',

  pillPurpleBg: 'rgba(168,85,247,0.18)',
  pillPurpleBorder: 'rgba(168,85,247,0.55)',
  pillPurpleText: 'rgba(216,180,254,0.95)',

  pillGreenBg: 'rgba(34,197,94,0.14)',
  pillGreenBorder: 'rgba(34,197,94,0.45)',
  pillGreenText: 'rgba(134,239,172,0.95)',

  pillRedBg: 'rgba(239,68,68,0.14)',
  pillRedBorder: 'rgba(239,68,68,0.45)',
  pillRedText: 'rgba(252,165,165,0.95)',

  primary: 'rgba(168,85,247,0.95)',
  primaryBorder: 'rgba(168,85,247,0.55)',

  sheetBg: 'rgba(10,10,12,0.92)',
  sheetCardBg: 'rgba(255,255,255,0.03)',
}

function Pill({
  label,
  variant = 'neutral',
}: {
  label: string
  variant?: 'neutral' | 'purple' | 'green' | 'red'
}) {
  const map = {
    neutral: {
      bg: COLORS.pillNeutralBg,
      border: COLORS.pillNeutralBorder,
      color: COLORS.pillNeutralText,
    },
    purple: {
      bg: COLORS.pillPurpleBg,
      border: COLORS.pillPurpleBorder,
      color: COLORS.pillPurpleText,
    },
    green: {
      bg: COLORS.pillGreenBg,
      border: COLORS.pillGreenBorder,
      color: COLORS.pillGreenText,
    },
    red: {
      bg: COLORS.pillRedBg,
      border: COLORS.pillRedBorder,
      color: COLORS.pillRedText,
    },
  } as const

  const c = map[variant]

  return (
    <View style={[styles.pill, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Text style={[styles.pillText, { color: c.color }]}>{label}</Text>
    </View>
  )
}

function TicketCard({
  ticket,
  onView,
  onDetails,
  onAddCalendar,
}: {
  ticket: Ticket
  onView: () => void
  onDetails: () => void
  onAddCalendar: () => void
}) {
  const isHot = ticket.badge === 'HOT'
  const isFree = ticket.badge === 'FREE ENTRY'
  const statusVariant = ticket.status === 'ACTIVE' ? 'purple' : 'green'

  return (
    <View style={styles.card}>
      {/* Cover */}
      <View style={styles.coverWrap}>
        <ImageBackground
          source={
            ticket.coverUrl
              ? { uri: ticket.coverUrl }
              : undefined
          }
          style={styles.cover}
          imageStyle={styles.coverImg}
        >
          {/* fallback cover se não tiver imagem */}
          {!ticket.coverUrl ? <View style={styles.coverFallback} /> : null}

          {/* overlay */}
          <View style={styles.coverOverlay} />

          {/* top left badges */}
          <View style={styles.coverBadgesLeft}>
            {isHot ? <Pill label="HOT" variant="red" /> : null}
            {isFree ? <Pill label="FREE ENTRY" variant="neutral" /> : null}
          </View>

          {/* top right status */}
          <View style={styles.coverBadgesRight}>
            <Pill label={ticket.status} variant={statusVariant} />
          </View>
        </ImageBackground>
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={styles.ticketTitle}>{ticket.title}</Text>

        <View style={styles.metaCol}>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.75)" />
            <Text style={styles.metaText}>{ticket.venue}</Text>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.75)" />
            <Text style={styles.metaText}>{ticket.dateLabel}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <Pressable style={styles.btnPrimary} onPress={onView}>
            <Text style={styles.btnPrimaryText}>🎟️ View Ticket</Text>
          </Pressable>

          <Pressable style={styles.btnSecondary} onPress={onDetails}>
            <Text style={styles.btnSecondaryText}>Details</Text>
          </Pressable>
        </View>

        {/* Add to calendar */}
        <Pressable style={styles.calendarBtn} onPress={onAddCalendar}>
          <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.55)" />
          <Text style={styles.calendarText}>Add to calendar</Text>
        </Pressable>
      </View>
    </View>
  )
}

function SegmentedTabs({
  value,
  onChange,
}: {
  value: TabKey
  onChange: (v: TabKey) => void
}) {
  return (
    <View style={styles.tabsWrap}>
      <Pressable
        onPress={() => onChange('upcoming')}
        style={[styles.tabBtn, value === 'upcoming' ? styles.tabBtnActive : null]}
      >
        <Text style={[styles.tabText, value === 'upcoming' ? styles.tabTextActive : null]}>
          Upcoming
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange('past')}
        style={[styles.tabBtn, value === 'past' ? styles.tabBtnActive : null]}
      >
        <Text style={[styles.tabText, value === 'past' ? styles.tabTextActive : null]}>
          Past
        </Text>
      </Pressable>
    </View>
  )
}

function TicketSheet({
  visible,
  onClose,
  ticket,
}: {
  visible: boolean
  onClose: () => void
  ticket: Ticket | null
}) {
  if (!ticket) return null

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* sheet */}
      <View style={styles.sheet}>
        <View style={styles.sheetHandle} />

        <Text style={styles.sheetTitle}>{ticket.title}</Text>
        <Text style={styles.sheetSubtitle}>{ticket.dateLabel}</Text>

        <View style={styles.qrWrap}>
          <View style={styles.qrBox}>
            <QRCode value={ticket.qrValue} size={140} />
          </View>

          <Text style={styles.qrCodeLabel}>{ticket.codeLabel}</Text>

          <Text style={styles.qrHint}>
            Show this QR code at the entrance to gain access.
          </Text>
        </View>

        <Pressable style={styles.checkinBtn} onPress={() => {}}>
          <Text style={styles.checkinBtnText}>Check-in Now</Text>
        </Pressable>

        <Pressable onPress={onClose} style={{ marginTop: 14 }}>
          <Text style={styles.minimizeText}>Minimize</Text>
        </Pressable>
      </View>
    </Modal>
  )
}

export default function TicketsScreen() {
  const [tab, setTab] = useState<TabKey>('upcoming')
  const [openTicketId, setOpenTicketId] = useState<string | null>(null)

  const tickets = useMemo<Ticket[]>(() => {
    const upcoming: Ticket[] = [
      {
        id: 't1',
        title: 'The Neon Party',
        venue: "Jocker’s Bar",
        dateLabel: 'Fri, Oct 24 • 23:00',
        status: 'ACTIVE',
        badge: 'HOT',
        coverUrl:
          'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        qrValue: 'moody://ticket/t1',
        codeLabel: 'NEON - 248 - XJ9',
      },
      {
        id: 't2',
        title: 'Midnight Session',
        venue: 'House Club',
        dateLabel: 'Sat, Oct 25 • 22:00',
        status: 'CONFIRMED',
        badge: 'FREE ENTRY',
        coverUrl:
          'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
        qrValue: 'moody://ticket/t2',
        codeLabel: 'MIDS - 902 - QK1',
      },
    ]

    const past: Ticket[] = [
      {
        id: 'p1',
        title: 'Retro Night',
        venue: 'Downtown Lounge',
        dateLabel: 'Sat, Sep 14 • 21:00',
        status: 'CONFIRMED',
        coverUrl:
          'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
        qrValue: 'moody://ticket/p1',
        codeLabel: 'RETR - 111 - AA0',
      },
    ]

    return tab === 'upcoming' ? upcoming : past
  }, [tab])

  const selectedTicket = useMemo(
    () => tickets.find((t) => t.id === openTicketId) ?? null,
    [tickets, openTicketId]
  )

  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        {/* Header */}
        <View style={styles.topRow}>
          <Text style={styles.title}>Tickets</Text>

          <Pressable
            style={styles.iconBtn}
            onPress={() => {
              // depois: modal opções/filtro
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={18} color="rgba(255,255,255,0.85)" />
          </Pressable>
        </View>

        {/* Tabs */}
        <SegmentedTabs value={tab} onChange={setTab} />

        {/* List */}
        <View style={styles.list}>
          {tickets.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
              onView={() => setOpenTicketId(t.id)}
              onDetails={() => {
                // depois: ir pra details do evento/ingresso
              }}
              onAddCalendar={() => {
                // depois: integrar calendário
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Sheet */}
      <TicketSheet
        visible={!!openTicketId}
        onClose={() => setOpenTicketId(null)}
        ticket={selectedTicket}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 18,
    paddingTop: Platform.select({ ios: 54, android: 30, default: 30 }),
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_900Black',
    letterSpacing: -0.4,
    color: COLORS.text,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsWrap: {
    height: 42,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 4,
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  tabText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: 'rgba(255,255,255,0.55)',
  },
  tabTextActive: {
    color: 'rgba(255,255,255,0.92)',
  },

  list: {
    gap: 14,
    paddingBottom: 10,
  },

  card: {
    borderRadius: 26,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },

  coverWrap: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cover: {
    height: 180,
    position: 'relative',
  },
  coverImg: {
    resizeMode: 'cover',
  },
  coverFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  coverBadgesLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    gap: 8,
  },
  coverBadgesRight: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  pill: {
    height: 20,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: 'Inter_400Regular',
    textTransform: 'uppercase',
  },

  cardContent: {
    paddingTop: 12,
    paddingHorizontal: 6,
    paddingBottom: 6,
  },
  ticketTitle: {
    fontSize: 25,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.2,
    color: COLORS.text,
  },

  metaCol: {
    marginTop: 8,
    gap: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12.5,
    fontFamily: 'Inter_500Medium',
    color: 'rgba(255,255,255,0.70)',
  },

  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  btnPrimary: {
    flex: 1,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    color: '#fff',
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 13,
  },
  btnSecondary: {
    width: 92,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 13,
  },

  calendarBtn: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11.5,
    fontFamily: 'Inter_500Medium',
  },

  // ===== Sheet =====
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheet: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 28,
    backgroundColor: COLORS.sheetBg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 18,
    paddingTop: 14,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.20)',
    marginBottom: 14,
  },
  sheetTitle: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 18,
  },
  sheetSubtitle: {
    textAlign: 'center',
    marginTop: 6,
    color: 'rgba(255,255,255,0.55)',
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
  },

  qrWrap: {
    marginTop: 14,
    alignItems: 'center',
  },
  qrBox: {
    width: 200,
    height: 200,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeLabel: {
    marginTop: 14,
    color: 'rgba(255,255,255,0.70)',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    letterSpacing: 1.2,
  },
  qrHint: {
    marginTop: 10,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.35)',
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 18,
  },

  checkinBtn: {
    marginTop: 18,
    height: 46,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkinBtnText: {
    color: '#fff',
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 13,
  },

  minimizeText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.55)',
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
  },
})
