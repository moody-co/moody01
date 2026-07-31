// components/moody-tab-bar.tsx
import React from 'react'
import { View, Pressable, StyleSheet, Text, Platform } from 'react-native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { usePathname } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

function shouldHideNav(pathname: string) {
  return (
    /^\/event\/[^/]+(\/(presence|verified|checkin|camera|thanks))?$/.test(pathname) ||
    /^\/venue\/[^/]+$/.test(pathname)
  )
}

const baseColor = '#A279E8'
const activeColor = 'rgba(255,255,255,0.95)'
const navBg = '#130131'
const borderColor = 'rgba(162,121,232,0.55)'

export function MoodyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const pathname = usePathname()
  const insets = useSafeAreaInsets()

  if (shouldHideNav(pathname)) return null

  const bottom = Math.max(44, insets.bottom + 16)

  return (
    <View pointerEvents="box-none" style={styles.root}>
      <View style={[styles.bar, { bottom }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          const color = isFocused ? activeColor : baseColor

          const iconName = getIcon(route.name, isFocused)

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.item}
              android_ripple={{ color: 'rgba(255,255,255,0.08)', borderless: true }}
            >
              <Ionicons name={iconName as any} size={22} color={color} />
              <Text style={[styles.label, { color }]}>{labelFor(route.name)}</Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

function labelFor(name: string) {
  switch (name) {
    case 'discover':
      return 'Discover'
    case 'live':
      return 'Live'
    case 'tickets':
      return 'Tickets'
    case 'profile':
      return 'Profile'
    default:
      return name
  }
}

function getIcon(name: string, focused: boolean) {
  switch (name) {
    case 'discover':
      return focused ? 'compass' : 'compass-outline'
    case 'live':
      // No web era FiRadio
      return focused ? 'radio' : 'radio-outline'
    case 'tickets':
      return focused ? 'ticket' : 'ticket-outline'
    case 'profile':
      return focused ? 'person' : 'person-outline'
    default:
      return focused ? 'ellipse' : 'ellipse-outline'
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bar: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -0.5 }], 
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 6,
    fontFamily: 'Inter_700Bold',
  },
})
;(styles as any).bar = StyleSheet.create({
  bar: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    maxWidth: 520,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: navBg,
    borderWidth: 2,
    borderColor,
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 16 },
    elevation: Platform.OS === 'android' ? 12 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}).bar
