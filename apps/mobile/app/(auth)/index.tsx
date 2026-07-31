import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const colors = {
  background: '#000000',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.55)',
  border: 'rgba(255,255,255,0.18)',
  divider: '#333333',
  gradientTop: '#A279E8',
  gradientBottom: '#5A2CA8',
}

export default function LoginScreen() {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        minHeight: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 180,     
        paddingBottom: 40,  
        paddingHorizontal: 24,
        width: '100%',
      }}
    >
      {/* Bloco do Topo */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 40,
            fontWeight: '900',
            letterSpacing: 2,
            fontFamily: 'Inter_900Black',
          }}
        >
          MOODY
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 100, 
            fontSize: 14,
            fontFamily: 'Inter_500Medium',
          }}
        >
          Login with the best way to connect
        </Text>
      </View>

      {/* Bloco de Botões */}
      <View
        style={{
          width: '80%',      
          maxWidth: 400,    
          alignItems: 'center',
          marginBottom: 100, 
        }}
      >
        {/* Apple */}
        <SocialButton
          label="Continue with apple"
          leftIcon={<Ionicons name="logo-apple" size={18} color="#fff" />}
          onPress={() => {}}
        />

        {/* Google */}
        <SocialButton
          label="Continue with google"
          leftIcon={<Text style={{ fontSize: 16, fontWeight: '900', color: '#fff' }}>G</Text>}
          onPress={() => {}}
        />

        {/* Divisor OR */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: colors.divider }} />
          <Text style={{ color: colors.textSecondary, paddingHorizontal: 15, fontSize: 12, fontFamily: 'Inter_600SemiBold' }}>
            OR
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.divider }} />
        </View>

        {/* Botão gradiente */}
        <GradientButton
          label="Continue with email"
          onPress={() => router.replace('/vibe' as any)}
        />

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 11,
            textAlign: 'center',
            marginTop: 24,
            lineHeight: 16,
            fontFamily: 'Inter_500Medium',
          }}
        >
          By continuing you agree to MOODY&apos;s Conditions of Use and Privacy
        </Text>
      </View>
    </View>
  )
}

function SocialButton({
  label,
  leftIcon,
  onPress,
}: {
  label: string
  leftIcon: React.ReactNode
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        height: 44, 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        position: 'relative',
      }}
    >
      <View style={{ position: 'absolute', left: 14 }}>
        {leftIcon}
      </View>

      <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'Inter_600SemiBold' }}>
        {label}
      </Text>
    </Pressable>
  )
}

function GradientButton({
  label,
  onPress,
}: {
  label: string
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: '100%', height: 48, borderRadius: 12, overflow: 'hidden' }}
    >
      <LinearGradient
        colors={['#A279E8', '#5A2CA8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 13,
            fontFamily: 'Inter_800ExtraBold',
          }}
        >
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  )
}
