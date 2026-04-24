import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'

import { useAuth } from '@/src/auth/auth.hooks'
import { toUserMessage } from '@/src/shared/errors/ui-error'
import { validateEmail, validatePassword } from '@/src/shared/validation/auth-validate'

import { AuthInput } from '@/components/ui/AuthInput'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { colors } from '@/src/theme/tokens'

export default function LoginScreen() {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit() {
    if (!validateEmail(email)) {
      setError('Digite um e-mail válido')
      return
    }
    if (!validatePassword(password)) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    setError(null)
    setLoading(true)
    try {
      await login({ email: email.trim(), password })
      router.replace('/(tabs)/discover')
    } catch (e) {
      setError(toUserMessage(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 18, justifyContent: 'center' }}>
      <Text style={{ color: colors.text, fontSize: 26, fontFamily: 'Inter_800ExtraBold' }}>
        Login
      </Text>

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 10, fontFamily: 'Inter_600SemiBold' }}>
        Email
      </Text>
      <AuthInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
        placeholder="seuemail@exemplo.com"
      />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontFamily: 'Inter_600SemiBold' }}>
        Senha
      </Text>
      <AuthInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        placeholder="********"
      />

      {error ? (
        <Text style={{ color: colors.danger, marginTop: 12, fontFamily: 'Inter_600SemiBold' }}>
          {error}
        </Text>
      ) : null}

      <View style={{ marginTop: 16 }}>
        <PrimaryButton title={loading ? 'Entrando...' : 'Entrar'} onPress={onSubmit} loading={loading} />
      </View>

      <Pressable onPress={() => router.push('/(auth)/register')} style={{ marginTop: 14, alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_600SemiBold' }}>
          Criar conta
        </Text>
      </Pressable>
    </View>
  )
}
