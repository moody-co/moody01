import { StyleSheet, View } from 'react-native'

import { Skeleton } from '@/components/ui/Skeleton'
import { radius, spacing } from '@/src/theme/tokens'

const CARD_COUNT = 3

export function DiscoverSkeleton() {
  return (
    <View
      accessible
      accessibilityLabel="Carregando eventos"
      accessibilityRole="progressbar"
      style={styles.container}
    >
      {Array.from({ length: CARD_COUNT }, (_, index) => (
        <View key={index} style={styles.card}>
          <Skeleton borderRadius={0} height={160} />

          <View style={styles.content}>
            <View style={styles.titleRow}>
              <View style={styles.titleFill}>
                <Skeleton height={22} width="82%" />
              </View>
              <Skeleton borderRadius={radius.pill} height={28} width={58} />
            </View>

            <View style={styles.divider} />

            <Skeleton height={14} width="64%" />

            <View style={styles.footerRow}>
              <Skeleton height={13} width="38%" />
              <Skeleton borderRadius={radius.pill} height={18} width={18} />
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 130,
    paddingHorizontal: spacing.screenX,
    paddingTop: 14,
  },
  card: {
    backgroundColor: '#1B1426',
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: radius.card,
    borderWidth: 1,
    marginBottom: 18,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  titleFill: {
    flex: 1,
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    height: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
})