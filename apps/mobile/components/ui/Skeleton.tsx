import { useEffect, useRef, useState } from 'react'
import {
  AccessibilityInfo,
  Animated,
  StyleSheet,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { radius } from '@/src/theme/tokens'

type SkeletonProps = {
  width?: DimensionValue
  height: number
  borderRadius?: number
  animated?: boolean
  style?: StyleProp<ViewStyle>
  testID?: string
}

export function Skeleton({
  width = '100%',
  height,
  borderRadius = radius.input,
  animated = true,
  style,
  testID,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.42)).current
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    let isMounted = true

    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (isMounted) setReduceMotion(enabled)
    })

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion)

    return () => {
      isMounted = false
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    if (!animated || reduceMotion) {
      opacity.stopAnimation()
      opacity.setValue(0.55)
      return
    }

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          duration: 700,
          toValue: 0.72,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          duration: 700,
          toValue: 0.35,
          useNativeDriver: true,
        }),
      ])
    )

    pulse.start()

    return () => {
      pulse.stop()
    }
  }, [animated, opacity, reduceMotion])

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.base,
        {
          borderRadius,
          height,
          opacity,
          width,
        },
        style,
      ]}
      testID={testID}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    overflow: 'hidden',
  },
})