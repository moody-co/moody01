import { useMemo } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

// ✅ mock simples (trocar depois pelo mock real / backend)
type Event = { id: string; title: string; venueName: string }
function getEventByIdMock(id: string): Event | undefined {
  const list: Event[] = [
    { id: '1', title: 'The Neon Lounge', venueName: 'Av. São João, Jd Aquarius' },
    { id: '2', title: 'White party', venueName: "OBECO'S BAR" },
    { id: '3', title: 'Tonight Vibe', venueName: 'São Paulo' },
  ]
  return list.find((e) => e.id === id)
}

export default function CheckinThanksScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>()
  const event = useMemo(() => (eventId ? getEventByIdMock(eventId) : undefined), [eventId])

  if (!eventId || !event) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', padding: 24, justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>Evento não encontrado.</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {/* ✅ Radial Gradient (center -> outside) */}
      <LinearGradient
        // expo-linear-gradient não tem radial nativo
        // então a gente simula com “camadas” + opacidade:
        // (fica muito próximo do protótipo)
        colors={['#060606', '#1C1322', '#412258']}
        locations={[0.0, 0.55, 1.0]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      {/* “Glow” central extra para parecer radial de verdade */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: -120,
          right: -120,
          top: 140,
          height: 520,
          borderRadius: 999,
          backgroundColor: '#412258',
          opacity: 0.28,
          transform: [{ scaleX: 1.2 }],
        }}
      />

      {/* Content */}
      <View
        style={{
          flex: 1,
          padding: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: '100%', maxWidth: 360, alignItems: 'center' }}>
          {/* ✅ ícone circular */}
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(162,121,232,0.18)',
              borderWidth: 1,
              borderColor: 'rgba(198,175,237,0.55)',
              shadowColor: '#000',
              shadowOpacity: 0.45,
              shadowRadius: 22,
              shadowOffset: { width: 0, height: 16 },
              elevation: 10,
            }}
          >
            <Ionicons name="checkmark" size={22} color="#C6AFED" />
          </View>

          <Text
            style={{
              marginTop: 18,
              fontSize: 25,
              color: '#fff',
              fontFamily: 'Inter_800ExtraBold',
              textAlign: 'center',
            }}
          >
            Thanks for sharing!
          </Text>

          <Text
            style={{
              marginTop: 12,
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'Inter_600SemiBold',
              lineHeight: 19,
              textAlign: 'center',
            }}
          >
            Your feedback helps others decide{'\n'}where to go tonight.
          </Text>

          {/* ✅ Botão Done com largura menor */}
          <View style={{ marginTop: 18, width: '100%', alignItems: 'center' }}>
            <Pressable
              onPress={() =>
                router.replace({ pathname: '/(tabs)/discover', params: { eventId } } as any)
              }
              style={({ pressed }) => ({
                width: 200, // 🔧 ajuste aqui (mesma ideia do web)
                height: 40,
                borderRadius: 20,
                backgroundColor: '#252424',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.14)',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text
                style={{
                  color: 'rgba(255,255,255,0.92)',
                  fontFamily: 'Inter_700Bold',
                }}
              >
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
