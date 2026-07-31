import type { ReactNode } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { colors, radius, spacing } from '@/src/theme/tokens'

type SharedProps = {
  title?: string
  message?: string
  visual?: ReactNode
  fill?: boolean
  contentStyle?: StyleProp<ViewStyle>
  testID?: string
}

type LoadingProps = SharedProps & {
  variant: 'loading'
}

type ErrorProps = SharedProps & {
  variant: 'error'
  message: string
  onRetry?: () => void
  retryText?: string
}

type EmptyProps = SharedProps & {
  variant: 'empty'
  message: string
  actionText?: string
  onAction?: () => void
}

export type ScreenStateProps = LoadingProps | ErrorProps | EmptyProps

export function ScreenState(props: ScreenStateProps) {
  const isError = props.variant === 'error'
  const isLoading = props.variant === 'loading'
  const title = resolveTitle(props)
  const action = resolveAction(props)

  return (
    <View
      accessibilityLiveRegion={isError ? 'assertive' : 'polite'}
      accessibilityRole={isError ? 'alert' : 'summary'}
      style={[styles.root, props.fill ? styles.rootFill : null, props.contentStyle]}
      testID={props.testID}
    >
      {props.visual ?? <StateVisual variant={props.variant} />}

      <Text style={[styles.title, isError ? styles.errorTitle : null]}>{title}</Text>

      {props.message ? <Text style={styles.message}>{props.message}</Text> : null}

      {action ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={action.label}
          hitSlop={8}
          onPress={action.onPress}
          style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
        >
          <Text style={styles.buttonText}>{action.label}</Text>
        </Pressable>
      ) : null}

      {isLoading ? <Text style={styles.assistiveText}>Aguarde enquanto os dados são carregados.</Text> : null}
    </View>
  )
}

function StateVisual({ variant }: { variant: ScreenStateProps['variant'] }) {
  if (variant === 'loading') {
    return (
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.visualWrap}>
        <ActivityIndicator color={colors.primary} size="small" />
      </View>
    )
  }

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.visualWrap, variant === 'error' ? styles.errorVisual : styles.emptyVisual]}
    >
      <Text style={[styles.visualText, variant === 'error' ? styles.errorVisualText : null]}>
        {variant === 'error' ? '!' : '—'}
      </Text>
    </View>
  )
}

function resolveTitle(props: ScreenStateProps) {
  if (props.title) return props.title
  if (props.variant === 'loading') return 'Carregando...'
  if (props.variant === 'error') return 'Não foi possível carregar'
  return 'Nada por aqui'
}

function resolveAction(props: ScreenStateProps) {
  if (props.variant === 'error' && props.onRetry) {
    return {
      label: props.retryText ?? 'Tentar novamente',
      onPress: props.onRetry,
    }
  }

  if (props.variant === 'empty' && props.onAction) {
    return {
      label: props.actionText ?? 'Atualizar',
      onPress: props.onAction,
    }
  }

  return null
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingHorizontal: spacing.screenX,
    paddingVertical: 28,
  },
  rootFill: {
    flex: 1,
    justifyContent: 'center',
  },
  visualWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(162,121,232,0.14)',
    borderColor: 'rgba(198,175,237,0.28)',
    borderRadius: radius.pill,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  errorVisual: {
    backgroundColor: 'rgba(255,138,138,0.12)',
    borderColor: 'rgba(255,138,138,0.35)',
  },
  emptyVisual: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: colors.border,
  },
  visualText: {
    color: colors.lilac,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 19,
  },
  errorVisualText: {
    color: colors.danger,
  },
  title: {
    color: colors.text,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 17,
    marginTop: 14,
    textAlign: 'center',
  },
  errorTitle: {
    color: colors.danger,
  },
  message: {
    color: colors.muted,
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
    maxWidth: 340,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    justifyContent: 'center',
    marginTop: 18,
    minHeight: 44,
    minWidth: 148,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  buttonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: colors.text,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 13,
  },
  assistiveText: {
    height: 1,
    opacity: 0,
    position: 'absolute',
    width: 1,
  },
})