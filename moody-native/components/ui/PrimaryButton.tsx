import React from 'react'
import { Pressable, Text, ActivityIndicator } from 'react-native'
import { colors, radius } from '@/src/theme/tokens'

type Props = {
  title: string
  onPress: () => void
  loading?: boolean
  disabled?: boolean
}

export function PrimaryButton({ title, onPress, loading = false, disabled = false }: Props) {
  const isDisabled = disabled || loading

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={{
        height: 48,
        borderRadius: radius.pill,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Inter_800ExtraBold',
            fontSize: 15,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  )
}
