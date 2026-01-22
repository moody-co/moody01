import { useMemo } from 'react'
import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const COLORS = {
  bg: '#000000',
  accent: '#A279E8',
  accentSoft: '#C6AFED',

  promoBg: '#46154D',
  promoBorder: '#8D189F',

  // ✅ Cards “Tonight’s Vibe”
  vibeCardBg: 'rgba(66,45,102,0.28)', // 🔧 diminua/aumente a opacidade aqui (0.40 ~ 0.76)
  vibeCardBorder: 'rgba(142,142,142,0.30)', // 🔧 borda mais suave

  label: 'rgba(142,142,142,0.60)', // título do card (music/crowd etc)
  textSoft: 'rgba(255,255,255,0.55)',

  // ✅ live checkins
  checkinDot: 'rgba(57,255,20,0.95)',
  checkinCardBg: 'rgba(255,255,255,0.06)',
  checkinCardBorder: 'rgba(255,255,255,0.10)',
}

export default function EventDetails() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>()

  const event = useMemo(
    () => ({
      title: 'WHite Party',
      city: 'São Paulo',
      area: 'Vila Madalena',
      promoTitle: '2 for 1',
      promoText: 'Only for the first 50 people',
      vibe: [
        { icon: 'musical-notes', label: 'music', value: 'Pop / Funk' },
        { icon: 'people', label: 'crowd', value: 'Medium' },
        { icon: 'sparkles', label: 'vibe', value: 'Lively' },
        { icon: 'time', label: 'open until', value: '4:00 Am' },
      ] as const,
      image:
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
      live: [
        { name: 'Lucas Guerra', text: 'Musica rolando e muito animado, vem que ta pocando', time: '5m ago' },
      ],
    }),
    []
  )

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE */}
        <Image
          source={{ uri: event.image }}
          style={{
            width: '100%',
            height: 320,
          }}
        />

        {/* CONTENT */}
        <View style={{ paddingHorizontal: 18, paddingTop: 14, paddingBottom: 26 }}>
          {/* Title row: Title + Share */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#fff', fontSize: 28, fontWeight: '900' }}>{event.title}</Text>

            <Pressable
              onPress={() => {}}
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                backgroundColor: 'rgba(0,0,0,0.35)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.10)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="share-outline" size={18} color={COLORS.accentSoft} />
            </Pressable>
          </View>

          <Text style={{ marginTop: 6, color: COLORS.accentSoft, fontSize: 14, fontWeight: '600' }}>
            {event.city} · {event.area}
          </Text>

          {/* divider */}
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(255,255,255,0.08)',
              marginTop: 16,
              marginBottom: 14,
            }}
          />

          {/* ✅ PROMO CARD com ícone “confete” */}
          <View
            style={{
              backgroundColor: COLORS.promoBg,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: COLORS.promoBorder,
              paddingVertical: 14,
              paddingHorizontal: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                backgroundColor: 'rgba(0,0,0,0.22)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.10)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 🎉 confete (Ionicons não tem "confetti", então usamos um equivalente visual) */}
              <Ionicons name="sparkles" size={18} color="#FF5CFF" />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16 }}>{event.promoTitle}</Text>
              <Text style={{ marginTop: 6, color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: 12 }}>
                {event.promoText}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.35)" />
          </View>

          {/* Tonight’s Vibe title */}
          <Text style={{ marginTop: 18, color: COLORS.accent, fontSize: 18, fontWeight: '900' }}>
            Tonight’s Vibe
          </Text>

          {/* 2x2 Cards */}
          <View style={{ marginTop: 12, flexDirection: 'row', gap: 12 }}>
            <MiniCard icon="musical-notes" label="music" value="Pop / Funk" />
            <MiniCard icon="people" label="crowd" value="Medium" />
          </View>
          <View style={{ marginTop: 12, flexDirection: 'row', gap: 12 }}>
            <MiniCard icon="sparkles" label="vibe" value="Lively" />
            <MiniCard icon="cash" label="price" value="$$" />
          </View>

          {/* ✅ LIVE CHECK-INS */}
          <View style={{ marginTop: 18 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: COLORS.checkinDot,
                  shadowColor: COLORS.checkinDot,
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                }}
              />
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>
                Live Check-ins (20)
              </Text>
            </View>

            {event.live.map((c) => (
              <View
                key={c.name}
                style={{
                  backgroundColor: COLORS.checkinCardBg,
                  borderWidth: 1,
                  borderColor: COLORS.checkinCardBorder,
                  borderRadius: 14,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>{c.name}</Text>
                  <Text style={{ marginTop: 4, color: 'rgba(255,255,255,0.35)', fontWeight: '600', fontSize: 12 }}>
                    {c.text}
                  </Text>
                </View>

                <Text style={{ color: 'rgba(255,255,255,0.30)', fontWeight: '700', fontSize: 12 }}>
                  {c.time}
                </Text>
              </View>
            ))}
          </View>

          {/* espaço pro bottom bar não cobrir conteúdo */}
          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* ✅ Bottom buttons: Maps ~20% e Going ocupa o resto */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 18,
          paddingBottom: 18,
          paddingTop: 12,
          backgroundColor: 'rgba(0,0,0,0.78)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {/* Maps pequeno (≈20%) */}
          <Pressable
            onPress={() => router.push({ pathname: '/event/[eventId]/presence', params: { eventId } } as any)}
            style={{
              width: 80, // 🔧 ajuste aqui (70~90) para chegar no ~20%
              height: 52,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: COLORS.promoBorder,
              backgroundColor: 'rgba(0,0,0,0.25)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="map-outline" size={18} color={COLORS.promoBorder} />
          </Pressable>

          {/* Going ocupa o resto */}
          <Pressable
            onPress={() => router.push({ pathname: '/event/[eventId]/presence', params: { eventId } } as any)}
            style={{
              flex: 1,
              height: 52,
              borderRadius: 14,
              backgroundColor: COLORS.accent,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text style={{ color: '#0B0014', fontWeight: '900', fontSize: 14 }}>I’m going here</Text>
            <Ionicons name="arrow-forward" size={18} color="#0B0014" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

function MiniCard({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value: string
}) {
  return (
    <View
      style={{
        flex: 1,
        height: 86, // 🔧 altura do card
        borderRadius: 14,
        backgroundColor: COLORS.vibeCardBg,
        borderWidth: 1,
        borderColor: COLORS.vibeCardBorder,
        padding: 12,
        justifyContent: 'center',
      }}
    >
      <Ionicons name={icon} size={18} color={COLORS.accentSoft} />
      <Text style={{ marginTop: 8, fontSize: 12, fontWeight: '700', color: COLORS.label }}>{label}</Text>
      <Text style={{ marginTop: 2, fontSize: 13, fontWeight: '600', color: '#fff' }}>{value}</Text>
    </View>
  )
}
