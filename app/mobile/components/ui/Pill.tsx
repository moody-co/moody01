import React from 'react'
import { View, Text } from 'react-native'
import { colors, radius } from '@/src/theme/tokens'

type Variant = 'default' | 'primary' | 'danger' | 'success'

const VARIANTS: Record<
  Variant,
  { bg: string; border: string; text: string }
> = {
  default: {
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.12)',
    text: 'rgba(255,255,255,0.85)',
  },
  primary: {
    bg: 'rgba(162,121,232,0.18)',
    border: 'rgba(162,121,232,0.55)',
    text: colors.primary,
  },
  danger: {
    bg: 'rgba(239,68,68,0.14)',
    border: 'rgba(239,68,68,0.45)',
    text: 'rgba(252,165,165,0.95)',
  },
  success: {
    bg: 'rgba(34,197,94,0.14)',
    border: 'rgba(34,197,94,0.45)',
    text: 'rgba(134,239,172,0.95)',
  },
}

export function Pill({
  label,
  variant = 'default',
}: {
  label: string
  variant?: Variant
}) {
  const c = VARIANTS[variant]

  return (
    <View
      style={{
        height: 22,
        paddingHorizontal: 10,
        borderRadius: radius.pill,
        borderWidth: 1,
        backgroundColor: c.bg,
        borderColor: c.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: c.text,
          fontSize: 10,
          letterSpacing: 0.6,
          fontFamily: 'Inter_700Bold',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </View>
  )
}
