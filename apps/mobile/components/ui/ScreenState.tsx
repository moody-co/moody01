import React from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { colors, radius, spacing } from '@/src/theme/tokens'

type Props =
  | { variant: 'loading'; title?: string }
  | { variant: 'error'; title?: string; message: string; onRetry?: () => void }
  | { variant: 'empty'; title?: string; message: string; actionText?: string; onAction?: () => void }

export function ScreenState(props: Props) {
  if (props.variant === 'loading') {
    return (
      <View style={wrap}>
        <ActivityIndicator />
        <Text style={titleStyle}>{props.title ?? 'Carregando...'}</Text>
      </View>
    )
  }

  if (props.variant === 'error') {
    return (
      <View style={wrap}>
        <Text style={[titleStyle, { color: colors.danger }]}>{props.title ?? 'Ops...'}</Text>
        <Text style={msgStyle}>{props.message}</Text>

        {props.onRetry ? (
          <Pressable onPress={props.onRetry} style={btn}>
            <Text style={btnText}>Tentar novamente</Text>
          </Pressable>
        ) : null}
      </View>
    )
  }

  return (
    <View style={wrap}>
      <Text style={titleStyle}>{props.title ?? 'Nada por aqui'}</Text>
      <Text style={msgStyle}>{props.message}</Text>

      {props.onAction ? (
        <Pressable onPress={props.onAction} style={btn}>
          <Text style={btnText}>{props.actionText ?? 'Ok'}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

const wrap = {
  paddingHorizontal: spacing.screenX,
  paddingTop: 18,
} as const

const titleStyle = {
  marginTop: 10,
  color: colors.text,
  fontFamily: 'Inter_800ExtraBold',
  fontSize: 16,
} as const

const msgStyle = {
  marginTop: 8,
  color: colors.muted,
  fontFamily: 'Inter_600SemiBold',
  fontSize: 13,
  lineHeight: 18,
} as const

const btn = {
  marginTop: 14,
  height: 44,
  borderRadius: radius.pill,
  backgroundColor: 'rgba(168,85,247,0.95)',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  paddingHorizontal: 16,
} as const

const btnText = {
  color: '#fff',
  fontFamily: 'Inter_800ExtraBold',
} as const
