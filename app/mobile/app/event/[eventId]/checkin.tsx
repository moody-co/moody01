import { useMemo, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

type Crowded = 'empty' | 'medium' | 'full'
type Vibe = 'low' | 'ok' | 'lively'
type PromoActive = 'yes' | 'no'
type WorthIt = 'yes' | 'no'

const UI = {
  formTopMargin: 36, // 🔧 empurra as perguntas pra baixo
  questionFontSize: 18,
  questionFontWeight: 'Inter_700Bold' as const,

  optionFontSize: 14,
  optionFontFamily: 'Inter_600SemiBold' as const,

  submitFontSize: 18,
  submitFontFamily: 'Inter_800ExtraBold' as const,

  bottomButtonOffset: 50, // 🔧 distância do fundo (igual web)
}

type Event = { id: string; title: string }
function getEventByIdMock(id: string): Event | undefined {
  const list: Event[] = [
    { id: '1', title: 'The Neon Lounge' },
    { id: '2', title: 'White party' },
    { id: '3', title: 'Tonight Vibe' },
  ]
  return list.find((e) => e.id === id)
}

export default function QuickCheckinScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>()
  const event = useMemo(() => (eventId ? getEventByIdMock(eventId) : undefined), [eventId])

  const [crowded, setCrowded] = useState<Crowded | null>(null)
  const [vibe, setVibe] = useState<Vibe | null>(null)
  const [promoActive, setPromoActive] = useState<PromoActive | null>(null)
  const [worthIt, setWorthIt] = useState<WorthIt | null>(null)

  if (!eventId || !event) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', padding: 24, justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontFamily: 'Inter_600SemiBold' }}>Evento não encontrado.</Text>
      </View>
    )
  }

  const canSubmit = !!(crowded && vibe && promoActive && worthIt)

  const submit = () => {
    // backend-ready: aqui vira POST /checkins
    const payload = { eventId, crowded, vibe, promoActive, worthIt, createdAt: new Date().toISOString() }
    console.log('QuickCheck-in payload:', payload)

    router.push({ pathname: '/event/[eventId]/camera', params: { eventId } } as any)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Background */}
      <LinearGradient
        colors={['rgba(0,0,0,1)', 'rgba(0,0,0,1)', 'rgba(19,1,49,1)']}
        locations={[0, 0.65, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      {/* Content */}
      <View style={{ flex: 1, paddingTop: 26, paddingHorizontal: 22, paddingBottom: 150 }}>
        <Text style={{ fontFamily: 'Inter_700Bold', letterSpacing: 0.6, fontSize: 33, fontWeight: '900', opacity: 0.9, color: '#ffffff', marginTop: 14 }}>
          MOODY
        </Text>

        <Text style={{ marginTop: 32, fontSize: 35, fontFamily: 'Inter_700Bold', color: '#fff' }}>
          Quick Check-in
        </Text>

        <Text
          style={{
            marginTop: 8,
            color: 'rgba(255,255,255,0.55)',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 15,
            lineHeight: 20,
          }}
        >
          Help the community know what’s happening{'\n'}
          at <Text style={{ color: 'rgba(255,255,255,0.8)' }}>{event.title}</Text> right now.
        </Text>

        {/* Questions */}
        <View style={{ marginTop: UI.formTopMargin, gap: 18 }}>
          <Question
            title="How crowded is it?"
            options={[
              { label: 'Empty', active: crowded === 'empty', onPress: () => setCrowded('empty') },
              { label: 'Medium', active: crowded === 'medium', onPress: () => setCrowded('medium') },
              { label: 'Full', active: crowded === 'full', onPress: () => setCrowded('full') },
            ]}
          />

          <Question
            title="How’s the vibe?"
            options={[
              { label: 'Low', icon: 'remove', active: vibe === 'low', onPress: () => setVibe('low') },
              { label: 'OK', icon: 'radio-button-on', active: vibe === 'ok', onPress: () => setVibe('ok') },
              { label: 'Lively', icon: 'flame', active: vibe === 'lively', onPress: () => setVibe('lively') },
            ]}
          />

          <Question
            title='Is the "2-for-1" promo active?'
            options={[
              { label: 'Yes', icon: 'thumbs-up', active: promoActive === 'yes', onPress: () => setPromoActive('yes') },
              { label: 'No', icon: 'thumbs-down', active: promoActive === 'no', onPress: () => setPromoActive('no') },
            ]}
          />

          <Question
            title="Worth going right now?"
            options={[
              {
                label: 'Yes',
                icon: 'checkmark',
                active: worthIt === 'yes',
                onPress: () => setWorthIt('yes'),
                accent: 'green',
              },
              {
                label: 'No',
                icon: 'close',
                active: worthIt === 'no',
                onPress: () => setWorthIt('no'),
              },
            ]}
          />
        </View>
      </View>

      {/* Submit fixed bottom */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: UI.bottomButtonOffset,
          paddingHorizontal: 18,
          paddingTop: 18,
          paddingBottom: 22,
        }}
        pointerEvents="box-none"
      >
        <Pressable
          onPress={submit}
          disabled={!canSubmit}
          style={{
            height: 60,
            borderRadius: 30,
            overflow: 'hidden',
            opacity: canSubmit ? 1 : 0.55,
          }}
        >
          <LinearGradient
            colors={['#A279E8', '#5A2CA8']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
            }}
          >
            <Text style={{ color: '#fff', fontFamily: UI.submitFontFamily, fontSize: UI.submitFontSize }}>
              Submit Review
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  )
}

function Question({
  title,
  options,
}: {
  title: string
  options: Array<{
    label: string
    active: boolean
    onPress: () => void
    icon?: keyof typeof Ionicons.glyphMap
    accent?: 'green'
  }>
}) {
  return (
    <View>
      <Text
        style={{
          fontSize: UI.questionFontSize,
          fontFamily: UI.questionFontWeight,
          color: 'rgba(255,255,255,0.9)',
          marginTop: 4,
          marginBottom: 20,
        }}
      >
        {title}
      </Text>

      <View style={{ flexDirection: 'row', gap: 13 }}>
        {options.map((opt) => (
          <OptionButton key={opt.label} {...opt} />
        ))}
      </View>
    </View>
  )
}

function OptionButton({
  label,
  active,
  onPress,
  icon,
  accent,
}: {
  label: string
  active: boolean
  onPress: () => void
  icon?: keyof typeof Ionicons.glyphMap
  accent?: 'green'
}) {
  const baseBg = 'rgba(255,255,255,0.06)'
  const activeBg = 'rgba(162,121,232,0.22)'
  const border = active ? 'rgba(198,175,237,0.55)' : 'rgba(255,255,255,0.12)'

  const greenActive = 'rgba(57,255,20,0.20)'
  const greenBorder = 'rgba(57,255,20,0.45)'

  const bg = active ? (accent === 'green' ? greenActive : activeBg) : baseBg
  const brd = active ? (accent === 'green' ? greenBorder : border) : border

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        height: 48,
        borderRadius: 10,
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: brd,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      {icon ? <Ionicons name={icon} size={16} color="rgba(255,255,255,0.9)" /> : null}
      <Text style={{ color: '#fff', fontFamily: UI.optionFontFamily, fontSize: UI.optionFontSize }}>{label}</Text>
    </Pressable>
  )
}
