import { useMemo, useState } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

import mapBackground from '../../../assets/images/maps-presence.png'


type Event = {
  id: string
  title: string
  venueName: string
}

function getEventByIdMock(id: string): Event | undefined {
  // 🔧 depois você troca por seu mock real / backend
  const list: Event[] = [
    { id: '1', title: 'The Neon Lounge', venueName: 'Av. São João, Jd Aquarius' },
    { id: '2', title: 'White party', venueName: "OBECO'S BAR" },
    { id: '3', title: 'Tonight Vibe', venueName: 'São Paulo' },
  ]
  return list.find((e) => e.id === id)
}

// mock services
async function verifyPresenceMock(_eventId: string) {
  // simula latência
  await new Promise((r) => setTimeout(r, 700))
  return true
}

export default function PresenceScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>()
  const [loading, setLoading] = useState(false)

  const event = useMemo(() => (eventId ? getEventByIdMock(eventId) : undefined), [eventId])

  if (!eventId || !event) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', padding: 24, justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontFamily: 'Inter_600SemiBold' }}>Evento não encontrado.</Text>
      </View>
    )
  }

  const onYesHere = async () => {
    if (!eventId) return
    setLoading(true)
    try {
      await verifyPresenceMock(eventId)

      // ✅ vai pra tela verified
      router.push({ pathname: '/event/[eventId]/verified', params: { eventId } } as any)
    } catch (err) {
      console.error('verifyPresence failed:', err)
      // você pode trocar por toast depois
      alert('Falha ao verificar presença (mock). Veja o console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* Mapa (imagem) */}
      <Image
        source={mapBackground}
        resizeMode="cover"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          opacity: 0.25, // ✅ igual ao web
        }}
      />

      {/* Gradiente para escurecer embaixo */}
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.15)', // topo leve
          'rgba(0,0,0,0.55)', // meio
          'rgba(0,0,0,0.92)', // embaixo bem escuro
        ]}
        locations={[0, 0.55, 1]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      {/* Card */}
      <View
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 70,
          minHeight: '48%', // ✅ equivalente ao 48vh do web
          borderRadius: 32,
          backgroundColor: '#231A32',
          borderWidth: 1,
          borderColor: '#C6AFED',
          paddingVertical: 28,
          paddingHorizontal: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ícone circular */}
        <View
          style={{
            width: 54,
            height: 54,
            borderRadius: 999,
            marginBottom: 14,
            backgroundColor: 'rgba(0,0,0,0.25)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.10)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="location" size={20} color="#A279E8" />
        </View>

        <Text
          style={{
            color: 'rgba(255,255,255,0.80)',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Are you here right now?
        </Text>

        <Text
          style={{
            marginTop: 12,
            fontFamily: 'Inter_800ExtraBold',
            fontSize: 35,
            color: '#fff',
            textAlign: 'center',
            lineHeight: 38,
          }}
          numberOfLines={2}
        >
          {event.title}
        </Text>

        <Text
          style={{
            marginTop: 6,
            color: 'rgba(255,255,255,0.55)',
            fontFamily: 'Inter_500Medium',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          📍 {event.venueName}
        </Text>

        {/* Botão Yes (centralizado) */}
        <View style={{ width: '100%', alignItems: 'center', marginTop: 18 }}>
          <Pressable
            disabled={loading}
            onPress={onYesHere}
            style={{
              width: '90%',
              height: 44,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.19)',
              backgroundColor: '#A279E8',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: loading ? 0.7 : 1,
            }}
          >
            <Text
              style={{
                color: '#0B0014',
                fontFamily: 'Inter_800ExtraBold',
                fontSize: 15,
              }}
            >
              {loading ? 'Verifying...' : 'Yes, I’m here'}
            </Text>
          </Pressable>
        </View>

        {/* No, somewhere else */}
        <Pressable
          onPress={() => router.replace('/(tabs)/discover' as any)}
          style={{ marginTop: 35 }}
        >
          <Text
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 15,
              fontFamily: 'Inter_600SemiBold',
            }}
          >
            No, somewhere else
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
