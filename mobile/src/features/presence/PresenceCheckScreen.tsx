import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'
import mapBackground from '../../assets/maps-presence.png'


import { getEventById } from '../../mock/events'
import { getPresence, verifyPresence } from '../../services/presenceService'

export const PresenceCheckScreen = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()

  const event = useMemo(() => (eventId ? getEventById(eventId) : undefined), [eventId])
  const [loading, setLoading] = useState(false)

  const presence = useMemo(() => (eventId ? getPresence(eventId) : null), [eventId])

  if (!eventId || !event) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100dvh', color: '#fff', padding: 24 }}>
        Evento não encontrado.
      </div>
    )
  }

    const onYesHere = async () => {
    if (!eventId) return
        setLoading(true)
        try {
            await verifyPresence(eventId)

            // ✅ navega pra tela verified
            navigate(`/app/discover/${eventId}/verified`)
        } catch (err) {
            console.error('verifyPresence failed:', err)
            alert('Falha ao verificar presença (mock). Veja o console.')
        } finally {
            setLoading(false)
        }
        }


  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, Arial',
      }}
    >
      {/* Mapa */}
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
          filter: 'saturate(0.85) contrast(0.95)',
        }}
      />

      {/* Gradiente para escurecer embaixo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      {/* Card */}
      <div
        style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 70,
            width: 'min(420px, calc(100vw - 32px))',
            minHeight: '48vh',
            borderRadius: 32,
            backgroundColor: '#231A32',
            border: '1px solid #C6AFED',
            boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
            padding: '28px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}
>

        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 999,
            margin: '0 auto 14px auto',
            backgroundColor: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <FaMapMarkerAlt size={20} style={{ color: '#A279E8' }} />
        </div>

        <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 18 }}>
          Are you here right now?
        </div>

        <div style={{ marginTop: 12, fontWeight: 800, fontSize: 35, color: '#fff' }}>
          {event.title}
        </div>

        <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.55)', fontWeight: 500, fontSize: 12 }}>
          📍 {event.venueName}
        </div>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 18,
            }}
            >
            <button
                type="button"
                disabled={loading}
                onClick={onYesHere}
                style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%', 
                height: 44,
                fontSize: 15,
                borderRadius: 15,
                border: '1px solid rgba(255, 255, 255, 0.19)',
                backgroundColor: '#A279E8',
                color: '#0B0014',
                fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                }}
            >
                {loading ? 'Verifying...' : 'Yes, I’m here'}
            </button>
        </div>


        <button
          type="button"
          onClick={() => navigate(`/app/discover/${eventId}/verified`)}
          style={{
            marginTop: 35,
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          No, somewhere else
        </button>
      </div>
    </div>
  )
}
