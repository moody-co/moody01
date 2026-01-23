import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/auth/auth.hooks'

export default function LoginScreen() {
  const { login } = useAuth()
  const [email, setEmail] = useState('fuska@email.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit() {
    setError(null)
    setLoading(true)
    try {
      await login({ email, password })
      router.replace('/(tabs)/discover') // ajuste para sua rota real
    } catch (e: any) {
      setError(e?.message ?? 'Erro ao logar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 18, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 26, fontWeight: '900' }}>Login</Text>

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 10 }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          marginTop: 8,
          height: 48,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.12)',
          paddingHorizontal: 12,
          color: '#fff',
        }}
      />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          marginTop: 8,
          height: 48,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.12)',
          paddingHorizontal: 12,
          color: '#fff',
        }}
      />

      {error ? <Text style={{ color: '#ff8a8a', marginTop: 12 }}>{error}</Text> : null}

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
        <Text style={{ color: '#fff', fontWeight: '900' }}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/(auth)/register')} style={{ marginTop: 14, alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Criar conta</Text>
      </Pressable>
    </View>
  )
}
