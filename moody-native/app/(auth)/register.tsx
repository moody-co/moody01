// FRONT: moody-native/app/(auth)/register.tsx
import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/src/auth/auth.hooks'
import { toUserMessage } from '@/src/shared/errors/ui-error'
import { validateEmail, validatePassword, validateName, validateUsername } from '@/src/shared/validation/auth-validate'

export default function RegisterScreen() {
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit() {
    if (!validateName(name)) {
      setError('Digite seu nome')
      return
    }
    if (!validateUsername(username)) {
      setError('Username deve ter no mínimo 3 caracteres')
      return
    }
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
      await register({ name: name.trim(), username: username.trim(), email: email.trim(), password })
      router.replace('/(tabs)/discover')
    } catch (e) {
      setError(toUserMessage(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 18, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 26, fontFamily: 'Inter_800ExtraBold' }}>Register</Text>

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 10, fontFamily: 'Inter_600SemiBold' }}>Nome</Text>
      <TextInput value={name} onChangeText={setName} editable={!loading} style={inputStyle} placeholder="Seu nome" placeholderTextColor="rgba(255,255,255,0.35)" />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontFamily: 'Inter_600SemiBold' }}>Username</Text>
      <TextInput value={username} onChangeText={setUsername} autoCapitalize="none" editable={!loading} style={inputStyle} placeholder="seuuser" placeholderTextColor="rgba(255,255,255,0.35)" />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontFamily: 'Inter_600SemiBold' }}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" editable={!loading} style={inputStyle} placeholder="seuemail@exemplo.com" placeholderTextColor="rgba(255,255,255,0.35)" />

      <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontFamily: 'Inter_600SemiBold' }}>Senha</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry editable={!loading} style={inputStyle} placeholder="********" placeholderTextColor="rgba(255,255,255,0.35)" />

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
          {loading ? 'Criando...' : 'Criar conta'}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ marginTop: 14, alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_600SemiBold' }}>Voltar</Text>
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
