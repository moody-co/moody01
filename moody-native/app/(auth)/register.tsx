import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/auth/auth.hooks'

export default function RegisterScreen() {
  const { register } = useAuth()
  const [name, setName] = useState('Fuska')
  const [username, setUsername] = useState('fuska')
  const [email, setEmail] = useState('fuska@email.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit() {
    setError(null)
    setLoading(true)
    try {
      await register({ name, username, email, password })
      router.replace('/(tabs)/discover') // ajuste para sua rota real
    } catch (e: any) {
      setError(e?.message ?? 'Erro ao registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 18, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 26, fontWeight: '900' }}>Register</Text>

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 10 }}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={inputStyle} />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>Username</Text>
      <TextInput value={username} onChangeText={setUsername} autoCapitalize="none" style={inputStyle} />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={inputStyle} />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>Senha</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={inputStyle} />

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
        <Text style={{ color: '#fff', fontWeight: '900' }}>{loading ? 'Criando...' : 'Criar conta'}</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ marginTop: 14, alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Voltar</Text>
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
} as const
