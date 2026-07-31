import { StyleSheet, View } from 'react-native'

import { Skeleton } from '@/components/ui/Skeleton'
import { radius } from '@/src/theme/tokens'

const CARD_COUNT = 2

export function TicketsSkeleton() {
  return (
    <View
      accessible
      accessibilityLabel="Carregando ingressos"
      accessibilityRole="progressbar"
      style={styles.list}
    >
      {Array.from({ length: CARD_COUNT }, (_, index) => (
        <View key={index} style={styles.card}>
          <Skeleton borderRadius={20} height={180} />

          <View style={styles.content}>
            <Skeleton height={25} width="74%" />

            <View style={styles.metaGroup}>
              <View style={styles.metaRow}>
                <Skeleton borderRadius={radius.pill} height={14} width={14} />
                <Skeleton height={13} width="58%" />
              </View>
              <View style={styles.metaRow}>
                <Skeleton borderRadius={radius.pill} height={14} width={14} />
                <Skeleton height={13} width="46%" />
              </View>
            </View>

            <View style={styles.actionsRow}>
              <View style={styles.primaryAction}>
                <Skeleton borderRadius={radius.pill} height={40} />
              </View>
              <Skeleton borderRadius={radius.pill} height={40} width={92} />
            </View>

            <Skeleton height={12} width="36%" style={styles.calendarLine} />
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 26,
    borderWidth: 1,
    padding: 12,
  },
  content: {
    paddingBottom: 6,
    paddingHorizontal: 6,
    paddingTop: 12,
  },
  metaGroup: {
    gap: 8,
    marginTop: 10,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  actionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  primaryAction: {
    flex: 1,
  },
  calendarLine: {
    alignSelf: 'center',
    marginTop: 16,
  },
})