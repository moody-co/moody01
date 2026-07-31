import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter'
import { QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from '@/src/auth/auth.context'
import { queryClient } from '@/src/config/query-client'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  })

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      void SplashScreen.hideAsync()
    }
  }, [fontsError, fontsLoaded])

  if (!fontsLoaded && !fontsError) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </QueryClientProvider>
  )
}
