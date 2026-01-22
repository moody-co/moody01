import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

type LiveTab = 'all' | 'clubs' | 'bars' | 'restaurants'

type LivePlace = {
  id: string
  name: string
  category: string
  distanceKm: number
  statusLeft: string // ex: "Full"
  statusMid: string // ex: "Lively"
  statusRight: string // ex: "2m ago"
  heroUrl: string
  peakNow?: boolean
}

type BusyCard = {
  id: string
  title: string
  place: string
  subtitle: string
  timeTag: string
  thumbUrl: string
}

const COLORS = {
  bg: '#000',
  text: '#fff',
  muted: 'rgba(255,255,255,0.55)',
  muted2: 'rgba(255,255,255,0.35)',
  border: 'rgba(255,255,255,0.10)',

  chipBg: 'rgba(255,255,255,0.03)',
  chipBgActive: 'rgba(255,255,255,0.08)',
  chipBorder: 'rgba(255,255,255,0.08)',
  chipBorderActive: 'rgba(255,255,255,0.14)',

  cardBg: 'rgba(255,255,255,0.03)',

  primary: 'rgba(168,85,247,0.95)',
  primaryBorder: 'rgba(168,85,247,0.55)',

  peakBg: 'rgba(236,72,153,0.16)',
  peakBorder: 'rgba(236,72,153,0.45)',
  peakText: 'rgba(251,207,232,0.95)',
  peakDot: 'rgba(236,72,153,0.95)',

  greenUp: 'rgba(34,197,94,0.85)',
}

function ChipTab({
  active,
  label,
  onPress,
}: {
  active: boolean
  label: string
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? COLORS.chipBgActive : COLORS.chipBg,
          borderColor: active ? COLORS.chipBorderActive : COLORS.chipBorder,
        },
      ]}
    >
      <Text style={[styles.chipText, { color: active ? 'rgba(255,255,255,0.92)' : COLORS.muted }]}>
        {label}
      </Text>
    </Pressable>
  )
}

function PeakPill({ label }: { label: string }) {
  return (
    <View style={styles.peakPill}>
      <View style={styles.peakDot} />
      <Text style={styles.peakPillText}>{label}</Text>
    </View>
  )
}

function MiniCard({
  item,
  onPress,
}: {
  item: BusyCard
  onPress: () => void
}) {
  return (
    <Pressable onPress={onPress} style={styles.miniCard}>
      {/* time tag */}
      <View style={styles.timeTag}>
        <Text style={styles.timeTagText}>{item.timeTag}</Text>
      </View>

      {/* thumbnail */}
      <View style={styles.thumbWrap}>
        <ImageBackground
          source={{ uri: item.thumbUrl }}
          style={styles.thumb}
          imageStyle={styles.thumbImg}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.20)', 'rgba(0,0,0,0.60)']}
            style={StyleSheet.absoluteFillObject}
          />
        </ImageBackground>
      </View>

      {/* text */}
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={styles.miniTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.miniPlace} numberOfLines={1}>
          {item.place}
        </Text>

        <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={styles.miniTrend}>↗</Text>
          <Text style={styles.miniSubtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default function LiveNowScreen() {
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
    []
  )

  const busy = useMemo<BusyCard[]>(
    () => [
      {
        id: 'covoid',
        title: 'The Void',
        place: 'Cocktail Bar',
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
    []
  )

  const onGoVenue = (venueId: string) => {
    // Se você criou app/venue/[venueId]/index.tsx:
    router.push({ pathname: '/venue/[venueId]', params: { venueId } } as any)
  }

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Live Termometer</Text>
            <Text style={styles.headerSub}>What’s happening right now</Text>
          </View>

          <Pressable
            style={styles.iconBtn}
            onPress={() => {
              // depois: filtros/ajustes
            }}
          >
            <Ionicons name="radio-outline" size={18} color="rgba(255,255,255,0.85)" />
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          <ChipTab active={tab === 'all'} label="All" onPress={() => setTab('all')} />
          <ChipTab active={tab === 'clubs'} label="Clubs" onPress={() => setTab('clubs')} />
          <ChipTab active={tab === 'bars'} label="Bars" onPress={() => setTab('bars')} />
          <ChipTab
            active={tab === 'restaurants'}
            label="Restaurants"
            onPress={() => setTab('restaurants')}
          />
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <ImageBackground source={{ uri: hero.heroUrl }} style={styles.heroImg} imageStyle={styles.heroImgStyle}>
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.25)',
                'rgba(0,0,0,0.15)',
                'rgba(0,0,0,0.85)',
              ]}
              locations={[0, 0.4, 1]}
              style={StyleSheet.absoluteFillObject}
            />

            {hero.peakNow ? (
              <View style={styles.peakWrap}>
                <PeakPill label="Peak now" />
              </View>
            ) : null}
          </ImageBackground>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{hero.name}</Text>
            <Text style={styles.heroMeta}>
              {hero.category} • {hero.distanceKm.toFixed(1)} km
            </Text>

            <View style={styles.statusRow}>
              <Text style={styles.statusItem}>👥 {hero.statusLeft}</Text>
              <Text style={styles.statusItem}>✨ {hero.statusMid}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="time-outline" size={13} color="rgba(255,255,255,0.65)" />
                <Text style={styles.statusItem}>{hero.statusRight}</Text>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <Pressable style={styles.primaryBtn} onPress={() => onGoVenue(hero.id)}>
                <Text style={styles.primaryBtnText}>Go now</Text>
              </Pressable>

              <Pressable style={styles.secondaryBtn} onPress={() => onGoVenue(hero.id)}>
                <Text style={styles.secondaryBtnText}>View place</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Just got busy */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Just got busy</Text>

          <Pressable
            onPress={() => {
              // depois: ver todos
            }}
            style={styles.sectionAction}
          >
            <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.45)" />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.miniScroll}>
          {busy.map((b) => (
            <MiniCard key={b.id} item={b} onPress={() => onGoVenue(b.id)} />
          ))}
        </ScrollView>
      </ScrollView>
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 6,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 30,
    fontFamily: 'Inter_900Black',
    letterSpacing: -0.4,
  },
  headerSub: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },

  iconBtn: {
    width: 56,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },

  heroCard: {
    marginTop: 14,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
  heroImg: {
    height: 200,
    position: 'relative',
  },
  heroImgStyle: {
    resizeMode: 'cover',
  },
  peakWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  peakPill: {
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: COLORS.peakBg,
    borderWidth: 1,
    borderColor: COLORS.peakBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  peakDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: COLORS.peakDot,
  },
  peakPillText: {
    color: COLORS.peakText,
    fontSize: 10,
    letterSpacing: 0.6,
    fontFamily: 'Inter_800ExtraBold',
    textTransform: 'uppercase',
  },

  heroContent: {
    padding: 14,
  },
  heroTitle: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 20,
    fontFamily: 'Inter_900Black',
    letterSpacing: -0.2,
  },
  heroMeta: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.60)',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },

  statusRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusItem: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },

  actionsRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  primaryBtn: {
    flex: 1,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'Inter_900Black',
    fontSize: 17,
  },
  secondaryBtn: {
    width: 120,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },

  sectionRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Inter_900Black',
    letterSpacing: -0.2,
  },
  sectionAction: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  miniScroll: {
    marginTop: 12,
    gap: 12,
    paddingRight: 18,
    paddingBottom: 6,
  },

  miniCard: {
    width: 200,
    minHeight: 90,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  timeTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 18,
    paddingHorizontal: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
  },
  timeTagText: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    color: 'rgba(255,255,255,0.80)',
  },

  thumbWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
    flexShrink: 0,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  thumbImg: {
    resizeMode: 'cover',
  },

  miniTitle: {
    fontSize: 15,
    fontFamily: 'Inter_900Black',
    color: 'rgba(255,255,255,0.92)',
  },
  miniPlace: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.70)',
  },
  miniTrend: {
    color: COLORS.greenUp,
    fontFamily: 'Inter_900Black',
    fontSize: 12,
  },
  miniSubtitle: {
    color: COLORS.greenUp,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 12,
  },
})
