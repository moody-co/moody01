import { View, Text, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  name: string
  location: string
  liveCount: number
  temperature: 'Hot' | 'Warm' | 'Cold' | string | undefined
  image: string
  onPress?: () => void
}

const UI = {
  imageHeight: 160, 
  cardRadius: 22,
}

export function PlaceCard({ name, location, liveCount, temperature, image, onPress }: Props) {
  const isHot = String(temperature).toLowerCase() === 'hot'

  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        borderRadius: UI.cardRadius,
        overflow: 'hidden',
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.14)',
        marginBottom: 18,
      }}
    >
      {/* Image */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: UI.imageHeight }}
          resizeMode="cover"
        />

        {/* FREE ENTRY */}
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 999,
            backgroundColor: '#7A00FF',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.14)',
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
              fontFamily: 'Inter_800ExtraBold',
              letterSpacing: 0.4,
            }}
          >
            FREE ENTRY
          </Text>
        </View>
      </View>

      {/* Infos */}
      <View style={{ backgroundColor: '#1B1426', paddingVertical: 14, paddingHorizontal: 16 }}>
        {/* Title + HOT */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 22,
              fontFamily: 'Inter_700Bold',
              lineHeight: 22,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          {isHot ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.14)',
                backgroundColor: 'rgba(0,0,0,0.20)',
              }}
            >
              <Ionicons name="flame" size={14} color="#FFB020" />
              <Text
                style={{
                  color: '#FFB020',
                  fontSize: 11,
                  fontFamily: 'Inter_900Black',
                  letterSpacing: 0.4,
                }}
              >
                HOT
              </Text>
            </View>
          ) : null}
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: 'rgba(255,255,255,0.14)',
            marginTop: 10,
            marginBottom: 10,
          }}
        />

        {/* Location */}
        <Text style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13.5, fontFamily: 'Inter_500Medium' }}>
          {location}
        </Text>

        {/* Footer */}
        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13, fontFamily: 'Inter_500Medium' }}>
            {liveCount} people here
          </Text>

          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.35)" />
        </View>
      </View>
    </Pressable>
  )
}
