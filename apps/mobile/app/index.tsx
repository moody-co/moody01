import { Redirect } from 'expo-router'
import { useAuth } from '@/src/auth/auth.hooks'

export default function Index() {
  const { isBooting, isAuthed } = useAuth()

  if (isBooting) return null

  return <Redirect href={isAuthed ? '/(tabs)/discover' : '/(auth)'} />
}
