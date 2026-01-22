import React, { useMemo } from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type StatItem = { value: number | string; label: string }

function Stat({ value, label }: StatItem) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

function Chip({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  return (
    <Pressable style={styles.chip} onPress={onPress}>
      <Text style={styles.chipText}>{children}</Text>
    </Pressable>
  )
}

export default function ProfileScreen() {
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
    []
  )

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <Text style={styles.title}>Profile</Text>

          <View style={styles.topRight}>
            <View style={styles.onlinePill}>
              <View style={styles.greenDot} />
              <Text style={styles.onlineText}>{user.isOnline ? 'Online' : 'Offline'}</Text>
            </View>

            <Pressable
              style={styles.iconBtn}
              onPress={() => {
                // depois: settings
              }}
              accessibilityLabel="Settings"
            >
              <Ionicons name="settings-outline" size={18} color="rgba(255,255,255,0.85)" />
            </Pressable>
          </View>
        </View>

        {/* MAIN CARD */}
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <View style={styles.statusBadgeOuter}>
              <View style={styles.statusBadgeInner} />
            </View>
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.65)" />
            <Text style={styles.locationText}>{user.location}</Text>
          </View>

          <Text style={styles.bio}>
            {user.bio} <Text style={{ opacity: 0.7 }}>●</Text>
          </Text>

          <View style={styles.actionsRow}>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                // depois: edit profile
              }}
            >
              <Ionicons name="pencil-outline" size={16} color="#fff" />
              <Text style={styles.primaryBtnText}>Edit Profile</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryBtn}
              onPress={() => {
                // depois: share
              }}
            >
              <Ionicons name="share-social-outline" size={16} color="rgba(255,255,255,0.88)" />
              <Text style={styles.secondaryBtnText}>Share</Text>
            </Pressable>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsCard}>
          <Stat value={42} label="Check-ins" />
          <View style={styles.divider} />
          <Stat value={18} label="Reviews" />
          <View style={styles.divider} />
          <Stat value={156} label="Saved" />
        </View>

        {/* YOUR VIBES */}
        <View style={styles.vibesCard}>
          <Text style={styles.vibesTitle}>Your Vibes</Text>
          <Text style={styles.vibesSubtitle}>Personalize your recommendations</Text>

          <View style={styles.chipRow}>
            <Chip>Bar / Drinks</Chip>
            <Chip>Club / Party</Chip>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  container: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    paddingBottom: 20,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.4,
    color: '#fff',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  onlinePill: {
    height: 42,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  onlineText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter_600SemiBold',
  },
  iconBtn: {
    width: 46,
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    borderRadius: 28,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },

  avatarWrap: {
    width: 78,
    height: 78,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 4,
    alignSelf: 'center',
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  statusBadgeOuter: {
    width: 18,
    height: 18,
    borderRadius: 999,
    position: 'absolute',
    right: 2,
    bottom: 2,
    backgroundColor: '#0b0b0f',
    borderWidth: 2,
    borderColor: 'rgba(34,197,94,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeInner: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },

  name: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.2,
    color: '#fff',
  },
  username: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    fontFamily: 'Inter_500Medium',
  },

  locationRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontFamily: 'Inter_500Medium',
  },

  bio: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 17,
    color: 'rgba(255,255,255,0.70)',
    paddingHorizontal: 8,
    fontFamily: 'Inter_500Medium',
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 23,
  },
  primaryBtn: {
    flex: 1,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.55)',
    backgroundColor: 'rgba(168,85,247,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },

  secondaryBtn: {
    flex: 1,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  secondaryBtnText: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: 'Inter_700Bold',
  },

  statsCard: {
    marginTop: 12,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  stat: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.2,
    color: '#fff',
  },
  statLabel: {
    marginTop: 6,
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    fontFamily: 'Inter_500Medium',
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginHorizontal: 6,
  },

  vibesCard: {
    marginTop: 14,
    borderRadius: 22,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  vibesTitle: {
    fontSize: 18,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.2,
    color: '#fff',
  },
  vibesSubtitle: {
    marginTop: 6,
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    fontFamily: 'Inter_500Medium',
  },
  chipRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },

  chip: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.55)',
    backgroundColor: 'rgba(168, 85, 247, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 12,
    color: 'rgba(216, 180, 254, 0.95)',
    fontFamily: 'Inter_600SemiBold',
  },
})
