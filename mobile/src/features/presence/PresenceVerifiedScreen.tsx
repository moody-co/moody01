import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { FaMapMarkerAlt } from 'react-icons/fa'


import { getEventById } from '../../mock/events'
import { getPresence } from '../../services/presenceService'
import mapBackground from '../../assets/maps-presence.png' 

const DEFAULT_SECONDS = 30 * 60 

function formatMMSS(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export const PresenceVerifiedScreen = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()

  const event = useMemo(() => (eventId ? getEventById(eventId) : undefined), [eventId])
  const presence = useMemo(() => (eventId ? getPresence(eventId) : null), [eventId])

  // Quando estiver backend-ready, isso vem do servidor.
  const unlockAtMs = useMemo(() => {
    // Se já tiver verifiedAt salvo, conta 30min a partir disso:
    if (presence?.verifiedAt) {
      const start = new Date(presence.verifiedAt).getTime()
      return start + DEFAULT_SECONDS * 1000
    }
    // fallback (não deveria acontecer, mas evita tela quebrada)
    return Date.now() + DEFAULT_SECONDS * 1000
  }, [presence])

  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((unlockAtMs - Date.now()) / 1000)))

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining(Math.max(0, Math.ceil((unlockAtMs - Date.now()) / 1000)))
    }, 250)
    return () => clearInterval(t)
  }, [unlockAtMs])

  if (!eventId || !event) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100dvh', color: '#fff', padding: 24 }}>
        Evento não encontrado.
      </div>
    )
  }

  const progress = 1 - remaining / DEFAULT_SECONDS // 0 -> 1

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
      {/* Map background */}
      <img
        src={mapBackground}
        alt="Map background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.25,
        }}
      />

      {/* Gradient (escurece) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.70) 35%, rgba(0,0,0,0.90) 65%, rgba(0,0,0,0.97) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 24px',
          textAlign: 'center',
          gap: 18,
        }}
      >
{/* Circle icon */}
    <div
    style={{
        width: 84,
        height: 84,
        borderRadius: 999,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(0,0,0,0.18)',
        border: '1px solid rgba(198,175,237,0.65)',
        boxShadow: '0 16px 44px rgba(0,0,0,0.45)',
    }}
    >
    <div
        style={{
        width: 56,
        height: 56,
        borderRadius: 999,
        background: 'rgba(35,26,50,0.85)',
        border: '1px solid rgba(162,121,232,0.35)',
        display: 'grid',
        placeItems: 'center',
        }}
    >
        <FaMapMarkerAlt
        size={20}
        style={{
            color: '#A279E8',
        }}
        />
    </div>
    </div>


        {/* Green pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 999,
            background: '#204728',
            border: '1px solid #7DFF97',
            color: 'rgba(200,255,200,0.95)',
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          <FaCheckCircle />
          Presence Verified
        </div>

        {/* Event title */}
        <div style={{ fontSize: 38, fontWeight: 800 }}>{event.title}</div>

        {/* Gray text */}
        <div style={{ maxWidth: 320, color: 'rgba(255,255,255,0.35)', fontWeight: 600, fontSize: 13, lineHeight: 1.35 }}>
          Enjoy the moment! Relax and have fun,
          <br />
          you’ll be able to evaluate the vibe soon.
        </div>

        {/* Timer card */}
        <div
          style={{
            marginTop: 8,
            width: 'min(320px, calc(100vw - 72px))',
            borderRadius: 18,
            background: 'rgba(0,0,0,0.28)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
            padding: '14px 14px 12px 14px',
          }}
        >
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 0.6 }}>
            EVALUATION UNLOCKS IN
          </div>

          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{formatMMSS(remaining)}</div>

          {/* Progress bar (discreta) */}
          <div
            style={{
              height: 3,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.14)',
              marginTop: 10,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
                background: '#A279E8',
              }}
            />
          </div>
        </div>
        {remaining === 0 && (
        <button
          type="button"
          onClick={() => navigate(`/app/discover/${eventId}/checkin`)}
          style={{
            marginTop: 14,
            padding: '10px 16px',
            borderRadius: 999,
            backgroundColor: '#A279E8',
            color: '#0B0014',
            border: '1px solid rgba(255,255,255,0.10)',
            fontWeight: 900,
            cursor: 'pointer',
          }}
        >
          Start Quick Check-in
        </button>
      )}


        {/* Minimize button */}
        <button
          type="button"
          onClick={() => alert('Minimize: depois a gente define o comportamento')}
          style={{
            marginTop: 18,
            padding: '8px 14px',
            borderRadius: 999,
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.16)',
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 400,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Minimize to background
        </button>

        {/* (Opcional) Voltar ao evento */}
        <button
          type="button"
          onClick={() => navigate(`/app/discover/${eventId}`)}
          style={{
            marginTop: 10,
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.35)',
            fontWeight: 500,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Back to event
        </button>
      </div>
    </div>
  )
}
