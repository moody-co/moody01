// FRONT: moody-native/app/(auth)/login.tsx
import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/src/auth/auth.hooks'
import { toUserMessage } from '@/src/shared/errors/ui-error'
import { validateEmail, validatePassword } from '@/src/shared/validation/auth-validate'

export default function LoginScreen() {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit() {
    // validação antes do request (UX)
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
    <View style={{ flex: 1, backgroundColor: '#000', padding: 18, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 26, fontFamily: 'Inter_800ExtraBold' }}>Login</Text>

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 10, fontFamily: 'Inter_600SemiBold' }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
        style={inputStyle}
        placeholder="seuemail@exemplo.com"
        placeholderTextColor="rgba(255,255,255,0.35)"
      />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontFamily: 'Inter_600SemiBold' }}>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        style={inputStyle}
        placeholder="********"
        placeholderTextColor="rgba(255,255,255,0.35)"
      />

      {error ? <Text style={{ color: '#ff8a8a', marginTop: 12, fontFamily: 'Inter_600SemiBold' }}>{error}</Text> : null}

      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={{
          marginTop: 16,
          height: 48,
          borderRadius: 999,
          backgroundColor: 'rgba(168,85,247,0.95)',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loading ? 0.6 : 1,
        }}
      >
        <Text style={{ color: '#fff', fontFamily: 'Inter_800ExtraBold' }}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push('/(auth)/register')} style={{ marginTop: 14, alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_600SemiBold' }}>Criar conta</Text>
      </Pressable>
    </View>
  )
}

const inputStyle = {
  marginTop: 8,
  height: 48,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.12)',
  paddingHorizontal: 12,
  color: '#fff',
  fontFamily: 'Inter_600SemiBold',
} as const
