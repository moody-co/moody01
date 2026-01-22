import { useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Facing = 'front' | 'back'

// ✅ mock (trocar depois pelo seu mock real / backend)
type Event = { id: string; title: string }
function getEventByIdMock(id: string): Event | undefined {
  const list: Event[] = [
    { id: '1', title: 'The Neon Lounge' },
    { id: '2', title: 'White party' },
    { id: '3', title: 'Tonight Vibe' },
  ]
  return list.find((e) => e.id === id)
}

export default function CheckinCameraScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>()
  const event = useMemo(() => (eventId ? getEventByIdMock(eventId) : undefined), [eventId])

  const cameraRef = useRef<CameraView>(null)

  const [permission, requestPermission] = useCameraPermissions()
  const [facing, setFacing] = useState<Facing>('back')
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [capturing, setCapturing] = useState(false)

  useEffect(() => {
    if (!permission) return
    if (!permission.granted) {
      requestPermission()
    }
  }, [permission, requestPermission])

  if (!eventId || !event) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', padding: 24, justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontFamily: 'Inter_600SemiBold' }}>Evento não encontrado.</Text>
      </View>
    )
  }

  const onClose = () => {
    router.replace({ pathname: '/event/[eventId]', params: { eventId } } as any)
  }

  const onFlip = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'))
  }

  const onCapture = async () => {
    const cam = cameraRef.current
    if (!cam) return

    if (!permission?.granted) {
      setError('Camera permission denied')
      return
    }

    try {
      setCapturing(true)
      setError(null)

      const photo = await cam.takePictureAsync({
        quality: 0.85,
        exif: false,
        skipProcessing: true,
      })

      // ✅ salva só o URI por enquanto (backend-ready)
      await AsyncStorage.setItem(`moody:checkinPhoto:${eventId}`, photo.uri)

      router.push({ pathname: '/event/[eventId]/thanks', params: { eventId } } as any)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to capture photo')
    } finally {
      setCapturing(false)
    }
  }

  const permissionDenied = !!permission && !permission.granted

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Camera */}
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        onCameraReady={() => setReady(true)}
      />

      {/* Gradient overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,0.95)']}
        locations={[0, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top buttons */}
      <View style={styles.topRow}>
        <IconButton onPress={onClose} ariaLabel="Close" >
          <Ionicons name="close" size={18} color="rgba(255,255,255,0.92)"  />
        </IconButton>

        <IconButton onPress={onFlip} ariaLabel="Flip camera">
          <Ionicons name="sync" size={18} color="rgba(255,255,255,0.92)" />
        </IconButton>
      </View>

      {/* Text block */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>
          Take a quick photo of the{'\n'}environment
        </Text>

        <Text style={styles.subtitle}>
          <Ionicons name="lock-closed" size={13} color="rgba(255,255,255,0.65)" />{' '}
          Validation only. Not public.
        </Text>

        {permissionDenied ? (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.errMain}>Camera permission denied</Text>
            <Text style={styles.errSub}>Permita acesso à câmera e recarregue.</Text>
          </View>
        ) : null}

        {error ? (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.errMain}>{error}</Text>
            <Text style={styles.errSub}>Tente novamente.</Text>
          </View>
        ) : null}
      </View>

      {/* Capture button */}
      <View style={styles.captureWrap}>
        <Pressable
          onPress={onCapture}
          disabled={!ready || permissionDenied || !!error || capturing}
          style={({ pressed }) => [
            styles.captureBtn,
            (!ready || permissionDenied || !!error || capturing) && { opacity: 0.55 },
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
          accessibilityLabel="Capture photo"
        />
      </View>
    </View>
  )
}

function IconButton({
  children,
  onPress,
  ariaLabel,
}: {
  children: React.ReactNode
  onPress: () => void
  ariaLabel: string
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={ariaLabel}
      style={({ pressed }) => [
        styles.iconBtn,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
      ]}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  topRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 270,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
  },
  errMain: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: 'rgba(255,180,180,0.95)',
    textAlign: 'center',
  },
  errSub: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
  },
  captureWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.92)',
    backgroundColor: 'rgba(255,255,255,0.18)',
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14,
  },
})
