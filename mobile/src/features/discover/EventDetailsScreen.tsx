import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  FaArrowLeft,
  FaShareAlt,
  FaChevronRight,
  FaMapMarkedAlt,
  FaMusic,
  FaUsers,
  FaClock,
  FaMicrophone,
} from 'react-icons/fa'

import { getEventById } from '../../mock/events'

export const EventDetailsScreen = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()

  const event = useMemo(() => (eventId ? getEventById(eventId) : undefined), [eventId])

  if (!event) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100dvh', color: '#fff', padding: 24 }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
          Voltar
        </button>
        Evento não encontrado.
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100dvh', color: '#fff', fontFamily: 'Inter, system-ui, Arial' }}>
      {/* HERO IMAGE */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img
          src={event.coverImageUrl}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.95))',
          }}
        />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: 18,
            left: 18,
            width: 44,
            height: 44,
            borderRadius: 30,
            background: '#656565',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
          }}
        >
          <FaArrowLeft size={18} style={{ color: '#ffffff' }} />
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: '14px 24px 150px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 39,
              lineHeight: 1.05,
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            {event.title}
          </h1>

          {/* Share button */}
          <button
            type="button"
            onClick={() => alert('Compartilhar: depois')}
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Share"
          >
            <FaShareAlt size={16} style={{ color: 'rgba(255,255,255,0.9)' }} />
          </button>
        </div>

        {/* small info under title */}
        <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.65)', fontWeight: 500, fontSize: 16 }}>
          {event.venueName} &nbsp;•&nbsp; {event.distanceKm.toFixed(1)} km away
        </div>

        {/* Promo (mais destacado) */}
        {event.promo && (
          <div
            style={{
              height: 80,
              marginTop: 14,
              borderRadius: 26,
              backgroundColor: '#46154D',
              border: '1px solid #8D189F',
              padding: '18px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* ícone “party/promo” aproximado */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 16,
                  background: 'rgba(0,0,0,0.18)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#D284DE',
                  fontSize: 22,
                  fontWeight: 900,
                }}
                aria-hidden="true"
              >
                🎉
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 21, fontWeight: 600, lineHeight: 0.7 }}>{event.promo.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 400, marginTop: 6 }}>
                  Promo valid for all drinks until {event.promo.validUntil}
                  <br />
                  tonight
                </div>
              </div>
            </div>

            <FaChevronRight style={{ color: 'rgba(255,255,255,0.35)' }} />
          </div>
        )}

        {/* Tonight's Vibe */}
        <h2 style={{ marginTop: 29, marginBottom: 14, fontSize: 20, fontWeight: 600 }}>
          Tonight’s Vibe
        </h2>

        {/* 2x2 vibe cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <VibeCard icon={<FaMusic />} label="MUSIC" value={event.vibe.music} />
          <VibeCard icon={<FaUsers />} label="CROWD" value={event.vibe.crowd} />
          <VibeCard icon={<FaClock />} label="OPEN UNTIL" value={event.vibe.openUntil} />
          <VibeCard icon={<FaMicrophone />} label="ON STAGE" value={event.vibe.dj ?? '—'} />
        </div>

        {/* Live check-ins */}
        <div style={{ marginTop: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: '#39FF14',
                boxShadow: '0 0 10px rgba(57,255,20,0.35)',
              }}
            />
            <div style={{ fontSize: 22, fontWeight: 900 }}>
              Live Check-ins ({event.liveCheckins.length})
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {event.liveCheckins.map((c) => (
              <div
                key={c.id}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 18,
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: 'rgba(162,121,232,0.25)',
                      border: '1px solid rgba(162,121,232,0.18)',
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{c.userName}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12,fontWeight:600, marginTop: 2 }}>
                      {c.message}
                    </div>
                  </div>
                </div>

                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: 700 }}>
                  {c.minutesAgo}m ago
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom actions (não ocupa largura toda) */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 35,
          padding: '18px 18px 22px 18px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0))',
        }}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
          {/* Map button */}
          <button
            type="button"
            style={{
              width: 76,
              height: 64,
              borderRadius: 22,
              backgroundColor: '#8D189F',
              border: '1px solid rgba(255,255,255,0.10)',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => alert('Abrir mapa: depois')}
            aria-label="Open map"
          >
            <FaMapMarkedAlt size={26} style={{ color: '#0B0014' }} />
          </button>

          {/* CTA (não ocupa tudo) */}
          <button
            type="button"
            style={{
              height: 64,
              width: 320, 
              maxWidth: 'calc(100vw - 140px)',
              borderRadius: 22,
              backgroundColor: '#A279E8',
              border: '2px solid rgba(162,121,232,0.55)',
              color: '#000000',
              fontWeight: 900, 
              fontSize: 20,
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/app/discover/${event.id}/presence`)}

          >
            I’m Going Here
          </button>
        </div>
      </div>
    </div>
  )
}

function VibeCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      style={{
        height: 150,
        borderRadius: 22,

        background: 'rgba(255,255,255,0.03)',
        border: '2px solid rgba(255,255,255,0.16)',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,

        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* ícone roxo mais leve */}
      <div style={{ color: '#A279E8', fontSize: 26, opacity: 0.9 }}>
        {icon}
      </div>

      {/* label cinza bem suave */}
      <div
        style={{
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 500, // ✅ menor peso
          letterSpacing: 1,
          fontSize: 13,
        }}
      >
        {label}
      </div>

      {/* value branco, peso menor (não extrabold) */}
      <div
        style={{
          fontSize: 18,     
          fontWeight: 600,  
          color: '#FFFFFF',
        }}
      >
        {String(value).toUpperCase()}
      </div>
    </div>
  )
}

