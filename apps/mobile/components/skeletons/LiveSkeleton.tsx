import { Platform, ScrollView, StyleSheet, View } from 'react-native'

import { Skeleton } from '@/components/ui/Skeleton'
import { radius } from '@/src/theme/tokens'

export function LiveSkeleton() {
  return (
    <View style={styles.page}>
      <ScrollView
        accessible
        accessibilityLabel="Carregando informações ao vivo"
        accessibilityRole="progressbar"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Skeleton height={28} width="70%" />
            <Skeleton height={12} width="52%" style={styles.headerSubtitle} />
          </View>
          <Skeleton borderRadius={radius.pill} height={36} width={56} />
        </View>

        <View style={styles.tabsRow}>
          <Skeleton borderRadius={radius.pill} height={30} width={54} />
          <Skeleton borderRadius={radius.pill} height={30} width={66} />
          <Skeleton borderRadius={radius.pill} height={30} width={58} />
          <Skeleton borderRadius={radius.pill} height={30} width={96} />
        </View>

        <View style={styles.heroCard}>
          <Skeleton borderRadius={0} height={200} />
          <View style={styles.heroContent}>
            <Skeleton height={22} width="66%" />
            <Skeleton height={13} width="44%" style={styles.heroMeta} />

            <View style={styles.statusRow}>
              <Skeleton height={15} width={70} />
              <Skeleton height={15} width={88} />
            </View>

            <View style={styles.actionsRow}>
              <View style={styles.primaryAction}>
                <Skeleton borderRadius={radius.pill} height={40} />
              </View>
              <Skeleton borderRadius={radius.pill} height={40} width={120} />
            </View>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <Skeleton height={20} width={130} />
          <Skeleton borderRadius={radius.pill} height={30} width={30} />
        </View>

        <View style={styles.miniRow}>
          <MiniCardSkeleton />
          <MiniCardSkeleton />
        </View>
      </ScrollView>
    </View>
  )
}

function MiniCardSkeleton() {
  return (
    <View style={styles.miniCard}>
      <Skeleton borderRadius={14} height={48} width={48} />
      <View style={styles.miniContent}>
        <Skeleton height={15} width="78%" />
        <Skeleton height={12} width="60%" style={styles.miniLine} />
        <Skeleton height={12} width="46%" style={styles.miniLine} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000',
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: Platform.select({ android: 30, default: 30, ios: 54 }),
  },
  scrollContent: {
    paddingBottom: 28,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  headerText: {
    flex: 1,
    maxWidth: 260,
  },
  headerSubtitle: {
    marginTop: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 26,
    borderWidth: 1,
    marginTop: 14,
    overflow: 'hidden',
  },
  heroContent: {
    padding: 14,
  },
  heroMeta: {
    marginTop: 8,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  actionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  primaryAction: {
    flex: 1,
  },
  sectionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  miniRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  miniCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 90,
    padding: 10,
    width: 200,
  },
  miniContent: {
    flex: 1,
  },
  miniLine: {
    marginTop: 7,
  },
})