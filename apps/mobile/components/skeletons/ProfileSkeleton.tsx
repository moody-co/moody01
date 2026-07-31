import { Platform, StyleSheet, View } from 'react-native'

import { Skeleton } from '@/components/ui/Skeleton'
import { radius } from '@/src/theme/tokens'

export function ProfileSkeleton() {
  return (
    <View
      accessible
      accessibilityLabel="Carregando perfil"
      accessibilityRole="progressbar"
      style={styles.page}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Skeleton height={28} width={112} />
          <View style={styles.topActions}>
            <Skeleton borderRadius={radius.pill} height={42} width={86} />
            <Skeleton borderRadius={radius.pill} height={46} width={46} />
          </View>
        </View>

        <View style={styles.mainCard}>
          <Skeleton
            borderRadius={radius.pill}
            height={78}
            style={styles.avatar}
            width={78}
          />
          <Skeleton height={23} width="48%" style={styles.centeredLine} />
          <Skeleton height={14} width="30%" style={styles.smallCenteredLine} />
          <Skeleton height={13} width="42%" style={styles.smallCenteredLine} />
          <Skeleton height={15} width="80%" style={styles.bioLine} />
          <Skeleton height={15} width="62%" style={styles.smallCenteredLine} />

          <View style={styles.actionsRow}>
            <View style={styles.actionFill}>
              <Skeleton borderRadius={radius.pill} height={42} />
            </View>
            <View style={styles.actionFill}>
              <Skeleton borderRadius={radius.pill} height={42} />
            </View>
          </View>

          <Skeleton borderRadius={radius.pill} height={40} style={styles.logoutLine} />
        </View>

        <View style={styles.statsCard}>
          <StatSkeleton />
          <View style={styles.divider} />
          <StatSkeleton />
          <View style={styles.divider} />
          <StatSkeleton />
        </View>

        <View style={styles.vibesCard}>
          <Skeleton height={19} width="34%" />
          <Skeleton height={12} width="58%" style={styles.vibesSubtitle} />
          <View style={styles.chipRow}>
            <Skeleton borderRadius={radius.pill} height={34} width={82} />
            <Skeleton borderRadius={radius.pill} height={34} width={104} />
            <Skeleton borderRadius={radius.pill} height={34} width={72} />
          </View>
        </View>
      </View>
    </View>
  )
}

function StatSkeleton() {
  return (
    <View style={styles.stat}>
      <Skeleton height={18} width={34} />
      <Skeleton height={12} width={58} style={styles.statLabel} />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000',
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: Platform.select({ android: 18, default: 18, ios: 18 }),
  },
  container: {
    alignSelf: 'center',
    maxWidth: 420,
    paddingBottom: 20,
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 30,
  },
  topActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  mainCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
  },
  avatar: {
    alignSelf: 'center',
  },
  centeredLine: {
    alignSelf: 'center',
    marginTop: 14,
  },
  smallCenteredLine: {
    alignSelf: 'center',
    marginTop: 8,
  },
  bioLine: {
    alignSelf: 'center',
    marginTop: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 23,
  },
  actionFill: {
    flex: 1,
  },
  logoutLine: {
    marginTop: 16,
  },
  statsCard: {
    alignItems: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  statLabel: {
    marginTop: 7,
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginHorizontal: 6,
    width: 1,
  },
  vibesCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
  },
  vibesSubtitle: {
    marginTop: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
})