import { colors } from '@/src/theme/tokens'

export const text = {
  h1: {
    color: colors.lilac,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 28,
    lineHeight: 36,
  },
  h2: {
    color: colors.text,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 22,
    lineHeight: 24,
  },
  label: {
    color: colors.muted2,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  body: {
    color: colors.text,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  error: {
    color: colors.danger,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
  },
} as const
