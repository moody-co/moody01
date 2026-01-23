// app/_layout.tsx
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { AuthProvider } from '../src/auth/auth.context'

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
}
