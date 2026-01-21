import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaTimes, FaSyncAlt } from 'react-icons/fa'

import { getEventById } from '../../mock/events'

type Facing = 'user' | 'environment'

export const CheckinCameraScreen = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()

  const event = useMemo(() => (eventId ? getEventById(eventId) : undefined), [eventId])

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [facing, setFacing] = useState<Facing>('environment')
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function start() {
      setError(null)
      setReady(false)

      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop())
          streamRef.current = null
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facing },
          },
          audio: false,
        })

        if (cancelled) return

        streamRef.current = stream

        const video = videoRef.current
        if (video) {
          video.srcObject = stream
          await video.play()
          setReady(true)
        }
      } catch (e: any) {
        setError(e?.message ?? 'Camera permission denied')
      }
    }

    start()

    return () => {
      cancelled = true
    }
  }, [facing])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
    }
  }, [])

  if (!eventId || !event) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100dvh', color: '#fff', padding: 24 }}>
        Evento não encontrado.
      </div>
    )
  }

  const onClose = () => {
    navigate(`/app/discover/${eventId}`)
  }

  const onFlip = () => {
    setFacing((prev) => (prev === 'environment' ? 'user' : 'environment'))
  }

  const onCapture = () => {
    const video = videoRef.current
    if (!video) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 720
    canvas.height = video.videoHeight || 1280

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    localStorage.setItem(`moody:checkinPhoto:${eventId}`, dataUrl)

    navigate(`/app/discover/${eventId}/thanks`)
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, Arial',
        color: '#fff',
      }}
    >
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'contrast(1.05) saturate(1.02)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={onClose} ariaLabel="Close">
          <FaTimes />
        </IconButton>

        <IconButton onClick={onFlip} ariaLabel="Flip camera">
          <FaSyncAlt />
        </IconButton>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 270,
          padding: '0 22px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700 }}>
          Take a quick photo of the
          <br />
          environment
        </div>

        <div style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
          <span style={{ marginRight: 6 }}>🔒</span>Validation only. Not public.
        </div>

        {error && (
          <div style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,180,180,0.95)', fontWeight: 700 }}>
            {error}
            <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
              Permita acesso à câmera no navegador e recarregue.
            </div>
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 120, display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={onCapture}
          disabled={!ready || !!error}
          style={{
            width: 100,
            height: 100,
            borderRadius: 999,
            border: '3px solid rgba(255,255,255,0.92)',
            background: 'rgba(255,255,255,0.18)',
            boxShadow: '0 16px 50px rgba(0,0,0,0.55)',
            cursor: !ready || !!error ? 'not-allowed' : 'pointer',
            opacity: !ready || !!error ? 0.55 : 1,
          }}
          aria-label="Capture photo"
        />
      </div>
    </div>
  )
}

function IconButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode
  onClick: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 48,
        height: 48,
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.92)',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
