import React from 'react'
import { TextInput, type TextInputProps } from 'react-native'
import { colors, radius } from '@/src/theme/tokens'

export function AuthInput(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="rgba(255,255,255,0.35)"
      {...props}
      style={[
        {
          marginTop: 8,
          height: 48,
          borderRadius: radius.input,
          borderWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: 12,
          color: colors.text,
          fontFamily: 'Inter_600SemiBold',
        },
        props.style,
      ]}
    />
  )
}
