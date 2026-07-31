import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

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

function Pill({
  label,
  variant = 'purple',
}: {
  label: string
  variant?: 'purple' | 'green' | 'red' | 'neutral'
}) {
  const map = {
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
  } as const

  const c = map[variant]

  return (
    <View style={[styles.pill, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Text style={[styles.pillText, { color: c.color }]}>{label}</Text>
    </View>
  )
}

export default function VenueDetailsScreen() {
  const { venueId } = useLocalSearchParams<{ venueId: string }>()
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
      <View style={{ flex: 1, backgroundColor: '#000', padding: 24, justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>Local não encontrado.</Text>
      </View>
    )
  }

  const tabLabel =
    tab === 'overview' ? 'OVERVIEW CONTENT' : tab === 'ratings' ? 'RATINGS CONTENT' : 'REVIEWS CONTENT'

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        {/* HERO */}
        <View style={styles.hero}>
          <Image source={{ uri: venue.heroUrl }} style={styles.heroImg} />

          <LinearGradient
            colors={[
              'rgba(0,0,0,0.30)',
              'rgba(0,0,0,0.12)',
              'rgba(0,0,0,0.92)',
            ]}
            locations={[0, 0.4, 1]}
            style={styles.heroOverlay}
          />

          {/* TOP BAR */}
          <View style={styles.heroTopBar}>
            <Pressable
              style={styles.iconBtn}
              onPress={() => router.back()}
              accessibilityLabel="Back"
            >
              <Ionicons name="chevron-back" size={29} color="rgba(255, 255, 255, 0.92)" />
            </Pressable>

            <Pressable
              style={styles.iconBtn}
              onPress={() => setLiked((v) => !v)}
              accessibilityLabel="Like"
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={28}
                color={liked ? 'rgba(255,90,120,0.95)' : 'rgba(255,255,255,0.92)'}
              />
            </Pressable>
          </View>

          {/* HOT pill */}
          {venue.isHot ? (
            <View style={styles.hotPillWrap}>
              <Pill label="HOT" variant="red" />
            </View>
          ) : null}
        </View>

        {/* CONTENT CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>HERO & MAIN INFO</Text>

          <Text style={styles.title}>{venue.name}</Text>
          <Text style={styles.subtitle}>{venue.subtitle}</Text>

          {/* Info rows */}
          <View style={styles.infoRow}>
            <View style={styles.infoLine}>
              <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.78)" />
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>{venue.distanceKm.toFixed(1)} km away</Text> • {venue.address}
              </Text>
            </View>

            <View style={styles.infoLine}>
              <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.78)" />
              <Text style={styles.infoText}>
                <Text style={styles.openNow}>{venue.isOpenNow ? 'Open now' : 'Closed'}</Text>
                <Text style={styles.dotSep}> • </Text>
                <Text style={styles.closeText}>Closes {venue.closesAt}</Text>
              </Text>
            </View>

            <View style={styles.infoLine}>
              <Ionicons name="people-outline" size={14} color="rgba(255,255,255,0.78)" />
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>{venue.peopleHereNow}</Text> people here now
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 14 }}>
            <Pill label="Presence Verified" variant="purple" />
          </View>

          <Text style={styles.actionsLabel}>MAIN ACTIONS</Text>

          <View style={styles.actionsRow}>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                // depois: check-in / going flow
              }}
            >
              <Text style={styles.primaryBtnText}>✨ I&apos;m Going</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryBtn}
              onPress={() => {
                // depois: abrir mapa
              }}
            >
              <Ionicons name="navigate-outline" size={16} color="rgba(255,255,255,0.88)" />
              <Text style={styles.secondaryBtnText}>Directions</Text>
            </Pressable>
          </View>

          <Text style={styles.tabsLabel}>TABS: OVERVIEW / RATINGS / REVIEWS</Text>

          <View style={styles.tabsWrap}>
            <Pressable
              style={[styles.tabBtn, tab === 'overview' ? styles.tabBtnActive : null]}
              onPress={() => setTab('overview')}
            >
              <Text style={[styles.tabText, tab === 'overview' ? styles.tabTextActive : null]}>
                Overview
              </Text>
            </Pressable>

            <Pressable
              style={[styles.tabBtn, tab === 'ratings' ? styles.tabBtnActive : null]}
              onPress={() => setTab('ratings')}
            >
              <Text style={[styles.tabText, tab === 'ratings' ? styles.tabTextActive : null]}>
                Ratings
              </Text>
            </Pressable>

            <Pressable
              style={[styles.tabBtn, tab === 'reviews' ? styles.tabBtnActive : null]}
              onPress={() => setTab('reviews')}
            >
              <Text style={[styles.tabText, tab === 'reviews' ? styles.tabTextActive : null]}>
                Reviews
              </Text>
            </Pressable>
          </View>

          <Text style={styles.tabContentLabel}>TAB 1 — {tabLabel}</Text>

          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>
              Por enquanto deixei esse conteúdo como placeholder pra ficar igual ao protótipo.{'\n\n'}
              Próximo passo: implementar cada tab:{'\n'}• Overview: descrição, horários, fotos, tags{'\n'}
              • Ratings: médias + categorias{'\n'}• Reviews: lista + escrever review
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#000' },

  hero: {
    height: 230,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImg: {
    position: 'absolute',
    inset: 0 as any,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  heroTopBar: {
    position: 'absolute',
    top: 44,
    left: 14,
    right: 14,
    zIndex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hotPillWrap: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    zIndex: 5,
  },

  card: {
    marginTop: -46,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#000',
    shadowOpacity: 0.65,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -18 },
    elevation: 14,
  },

  sectionLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    fontFamily: 'Inter_900Black',
    color: 'rgba(255,255,255,0.45)',
    marginTop: 6,
    marginBottom: 10,
  },

  title: {
    fontSize: 34,
    fontFamily: 'Inter_900Black',
    letterSpacing: -0.6,
    marginTop: 6,
    color: '#fff',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(255,255,255,0.62)',
    fontFamily: 'Inter_500Medium',
  },

  infoRow: {
    marginTop: 14,
    gap: 10,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 14.5,
    color: 'rgba(255,255,255,0.70)',
    fontFamily: 'Inter_500Medium',
  },
  infoBold: { fontFamily: 'Inter_800ExtraBold', color: '#fff' },

  openNow: {
    color: 'rgba(34,197,94,0.95)',
    fontFamily: 'Inter_700Bold',
  },
  closeText: {
    color: 'rgba(255,255,255,0.55)',
    fontFamily: 'Inter_500Medium',
  },
  dotSep: { color: 'rgba(255,255,255,0.35)' },

  pill: {
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 10,
    letterSpacing: 0.6,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
  },

  actionsLabel: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 10,
    letterSpacing: 1.2,
    fontFamily: 'Inter_900Black',
    color: 'rgba(255,255,255,0.45)',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  primaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.55)',
    backgroundColor: 'rgba(168,85,247,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 15,
  },
  secondaryBtn: {
    width: 140,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryBtnText: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: 'Inter_900Black',
    fontSize: 13,
  },

  tabsLabel: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 10,
    letterSpacing: 1.2,
    fontFamily: 'Inter_900Black',
    color: 'rgba(255,255,255,0.45)',
  },
  tabsWrap: {
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 4,
    flexDirection: 'row',
    gap: 6,
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
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: 'rgba(255,255,255,0.55)',
  },
  tabTextActive: {
    color: 'rgba(255,255,255,0.92)',
  },

  tabContentLabel: {
    marginTop: 14,
    fontSize: 10,
    letterSpacing: 1.2,
    fontFamily: 'Inter_900Black',
    color: 'rgba(255,255,255,0.35)',
  },
  placeholderCard: {
    marginTop: 10,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  placeholderText: {
    color: 'rgba(255,255,255,0.60)',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_500Medium',
  },
})
