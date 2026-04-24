import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export function VibeCard({
  title,
  subtitle,
  accentColor,
  icon,
  onPress,
}: {
  title: string
  subtitle: string
  accentColor: string
  icon: keyof typeof Ionicons.glyphMap
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 110,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        marginBottom: 16,
        overflow: 'hidden',
      }}
    >
      {/* Accent bar */}
      <View style={{ width: 6, height: '100%', backgroundColor: accentColor }} />

      {/* Icon */}
      <View style={{ padding: 18 }}>
        <Ionicons name={icon} size={28} color={accentColor} />
      </View>

      {/* Text */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 22,
            fontFamily: 'Inter_800ExtraBold',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 13,
            marginTop: 4,
            fontFamily: 'Inter_500Medium',
          }}
        >
          {subtitle}
        </Text>
      </View>

      {/* Arrow */}
      <View style={{ paddingRight: 18 }}>
        <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.35)" />
      </View>
    </Pressable>
  )
}
