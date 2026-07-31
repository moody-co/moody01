// app/(tabs)/_layout.tsx
import React from 'react'
import { Tabs } from 'expo-router'
import { MoodyTabBar } from '@/components/moody-tab-bar'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <MoodyTabBar {...props} />}
    >
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="live" />
      <Tabs.Screen name="tickets" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}
