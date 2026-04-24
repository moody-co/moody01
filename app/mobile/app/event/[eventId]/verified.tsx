import { useEffect, useMemo, useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

import mapBackground from '../../../assets/images/maps-presence.png'

const DEFAULT_SECONDS = 30 * 60 // 30 min

function formatMMSS(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

// ✅ mock (trocar depois pelo seu mock real / backend)
type Event = { id: string; title: string; venueName: string }
function getEventByIdMock(id: string): Event | undefined {
  const list: Event[] = [
    { id: '1', title: 'The Neon Lounge', venueName: 'Av. São João, Jd Aquarius' },
    { id: '2', title: 'White party', venueName: "OBECO'S BAR" },
    { id: '3', title: 'Tonight Vibe', venueName: 'São Paulo' },
  ]
  return list.find((e) => e.id === id)
}

// ✅ mock presence
function getPresenceMock(_eventId: string) {
  // simulando “verifiedAt” como agora, pra iniciar o contador
  return { verifiedAt: new Date().toISOString() }
}

export default function PresenceVerifiedScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>()
  const event = useMemo(() => (eventId ? getEventByIdMock(eventId) : undefined), [eventId])
  const presence = useMemo(() => (eventId ? getPresenceMock(eventId) : null), [eventId])

  const unlockAtMs = useMemo(() => {
    if (presence?.verifiedAt) {
      const start = new Date(presence.verifiedAt).getTime()
      return start + DEFAULT_SECONDS * 1000
    }
    return Date.now() + DEFAULT_SECONDS * 1000
  }, [presence])

  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.ceil((unlockAtMs - Date.now()) / 1000))
  )

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining(Math.max(0, Math.ceil((unlockAtMs - Date.now()) / 1000)))
    }, 250)
    return () => clearInterval(t)
  }, [unlockAtMs])

  if (!eventId || !event) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', padding: 24, justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontFamily: 'Inter_600SemiBold' }}>Evento não encontrado.</Text>
      </View>
    )
  }

  const progress = 1 - remaining / DEFAULT_SECONDS // 0 -> 1

  return (
    <View style={{ flex: 1, backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* Map background */}
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
          opacity: 0.25,
        }}
      />

      {/* Gradient (escurece) */}
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.40)',
          'rgba(0,0,0,0.70)',
          'rgba(0,0,0,0.90)',
          'rgba(0,0,0,0.97)',
        ]}
        locations={[0, 0.35, 0.65, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      {/* Content */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingVertical: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Circle icon */}
        <View
          style={{
            width: 84,
            height: 84,
            borderRadius: 999,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.18)',
            borderWidth: 1,
            borderColor: 'rgba(198,175,237,0.65)',
            shadowColor: '#000',
            shadowOpacity: 0.45,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 16 },
            elevation: 12,
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              backgroundColor: 'rgba(35,26,50,0.85)',
              borderWidth: 1,
              borderColor: 'rgba(162,121,232,0.35)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="location" size={20} color="#A279E8" />
          </View>
        </View>

        {/* Green pill */}
        <View
          style={{
            marginTop: 18,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 999,
            backgroundColor: '#204728',
            borderWidth: 1,
            borderColor: '#7DFF97',
          }}
        >
          <Ionicons name="checkmark-circle" size={16} color="rgba(200,255,200,0.95)" />
          <Text
            style={{
              color: 'rgba(200,255,200,0.95)',
              fontFamily: 'Inter_500Medium',
              fontSize: 15,
            }}
          >
            Presence Verified
          </Text>
        </View>

        {/* Event title */}
        <Text
          style={{
            marginTop: 16,
            fontSize: 38,
            fontFamily: 'Inter_800ExtraBold',
            color: '#fff',
            textAlign: 'center',
            lineHeight: 42,
          }}
        >
          {event.title}
        </Text>

        {/* Gray text */}
        <Text
          style={{
            marginTop: 10,
            maxWidth: 320,
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 13,
            lineHeight: 18,
            textAlign: 'center',
          }}
        >
          Enjoy the moment! Relax and have fun,{'\n'}
          you’ll be able to evaluate the vibe soon.
        </Text>

        {/* Timer card */}
        <View
          style={{
            marginTop: 18,
            width: 320,
            maxWidth: '90%',
            borderRadius: 18,
            backgroundColor: 'rgba(0,0,0,0.28)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.12)',
            paddingHorizontal: 14,
            paddingTop: 14,
            paddingBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'Inter_700Bold',
              letterSpacing: 0.6,
            }}
          >
            EVALUATION UNLOCKS IN
          </Text>

          <Text
            style={{
              fontSize: 34,
              fontFamily: 'Inter_900Black',
              marginTop: 6,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            {formatMMSS(remaining)}
          </Text>

          {/* Progress bar */}
          <View
            style={{
              height: 3,
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.14)',
              marginTop: 10,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                height: '100%',
                width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
                backgroundColor: '#A279E8',
              }}
            />
          </View>
        </View>
                {/* ✅ BOTÃO EXTRA: ir para o formulário (sempre disponível) */}
        <Pressable
          onPress={() =>
            router.push({ pathname: '/event/[eventId]/checkin', params: { eventId } } as any)
          }
          style={{
            marginTop: 14,
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.10)',
            backgroundColor: '#A279E8',
          }}
        >
          <Text style={{ color: '#0B0014', fontFamily: 'Inter_900Black' }}>
             Start Quick Check-in
          </Text>

        </Pressable>


        {/* Quando liberar */}
        {remaining === 0 ? (
          <Pressable
            onPress={() =>
              router.push({ pathname: '/event/[eventId]/checkin', params: { eventId } } as any)
            }
            style={{
              marginTop: 14,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 999,
              backgroundColor: '#A279E8',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.10)',
            }}
          >
            <Text style={{ color: '#0B0014', fontFamily: 'Inter_900Black' }}>
              Start Quick Check-in
            </Text>
          </Pressable>
        ) : null}

        {/* Minimize */}
        <Pressable
          onPress={() => {
            // depois a gente define comportamento real
          }}
          style={{
            marginTop: 18,
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.16)',
            backgroundColor: 'transparent',
          }}
        >
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter_400Regular', fontSize: 13 }}>
            Minimize to background
          </Text>
        </Pressable>

        {/* Back to event */}
        <Pressable
          onPress={() => router.replace({ pathname: '/event/[eventId]', params: { eventId } } as any)}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter_500Medium', fontSize: 13 }}>
            Back to event
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
