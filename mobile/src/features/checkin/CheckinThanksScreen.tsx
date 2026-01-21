import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

import { getEventById } from '../../mock/events'

export const CheckinThanksScreen = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()

  const event = useMemo(() => (eventId ? getEventById(eventId) : undefined), [eventId])

  if (!eventId || !event) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100dvh', color: '#fff', padding: 24 }}>
        Evento não encontrado.
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        fontFamily: 'Inter, system-ui, Arial',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, #412258 0%, #1C1322 39%, #060606 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div style={{ width: 'min(360px, calc(100vw - 48px))' }}>
          {/* ícone */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              margin: '0 auto',
              background: 'rgba(162,121,232,0.18)',
              border: '1px solid rgba(198,175,237,0.55)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 16px 44px rgba(0,0,0,0.45)',
            }}
          >
            <FaCheck style={{ color: '#C6AFED' }} />
          </div>

          <div style={{ marginTop: 18, fontWeight: 800, fontSize: 25 }}>
            Thanks for sharing!
          </div>

          <div
            style={{
              marginTop: 12,
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.35,
            }}
          >
            Your feedback helps others decide
            <br />
            where to go tonight.
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <button
              type="button"
              onClick={() => navigate(`/app/discover/${eventId}`)}
              style={{
                width: 200, // ✅ ajuste aqui para mais/menos largura
                height: 40,
                borderRadius: 20,
                background: '#252424',
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.92)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
