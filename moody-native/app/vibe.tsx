import { View, Text, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { VibeCard } from '@/components/VibeCard'

const colors = {
  bgTop: '#000000',
  bgBottom: '#120524',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.6)',
}

export default function VibeScreen() {
  return (
    <LinearGradient
      colors={['#000000', '#000000', '#120524']}
      locations={[0, 0.4, 1]}
      style={{ flex: 1, paddingTop: 60, paddingHorizontal: 24 }}
    >
      {/* Logo */}
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 54,
          fontWeight: '900',
          fontFamily: 'Inter_900Black',
        }}
      >
        MOODY
      </Text>

      {/* Title */}
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 36,
          marginTop: 30,
          lineHeight: 40,
          fontWeight: '900',
          fontFamily: 'Inter_900Black',
          maxWidth: 400,
        }}
      >
        What do you want{'\n'}to do tonight?
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 16,
          marginTop: 12,
          marginBottom: 50,
          fontFamily: 'Inter_500Medium',
        }}
      >
        Select a vibe to get started
      </Text>

      {/* Cards */}
      <VibeCard
        title="Bar / Drinks"
        subtitle="Cocktails, pubs & lounges"
        accentColor="#A000C8"
        icon="wine"
        onPress={() => router.replace('/(tabs)/discover' as any)}
      />

      <VibeCard
        title="Club / Party"
        subtitle="Dance floors & DJs"
        accentColor="#0080FF"
        icon="musical-notes"
        onPress={() => router.replace('/(tabs)/discover' as any)}
      />

      <VibeCard
        title="Food"
        subtitle="Late night bites & dinner"
        accentColor="#FFB000"
        icon="restaurant"
        onPress={() => router.replace('/(tabs)/discover' as any)}
      />
    </LinearGradient>
  )
}
