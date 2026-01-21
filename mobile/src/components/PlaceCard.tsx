import React from 'react'
import { FaChevronRight, FaFireAlt } from 'react-icons/fa'

type PlaceCardProps = {
  name: string
  location: string
  liveCount: number
  temperature: 'Hot' | 'Warm' | 'Cold' | string
  image: string
}

// 🔧 MUDE AQUI para testar alturas (ex: 160, 150, 145...)
const IMAGE_HEIGHT = 160

export const PlaceCard: React.FC<PlaceCardProps> = ({
  name,
  location,
  liveCount,
  temperature,
  image,
}) => {
  const isHot = String(temperature).toLowerCase() === 'hot'

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: '#000',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
        marginBottom: 18,
        fontFamily: 'Inter, system-ui, Arial',
      }}
    >
      {/* Imagem */}
      <div style={{ position: 'relative', height: IMAGE_HEIGHT }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* FREE ENTRY (depois a gente deixa dinâmico pelo badge) */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            padding: '6px 12px',
            borderRadius: 999,
            backgroundColor: '#7A00FF',
            color: '#fff',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.14)',
          }}
        >
          FREE ENTRY
        </div>
      </div>

      {/* Infos */}
      <div style={{ backgroundColor: '#1B1426', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3
            style={{
              margin: 0,
              color: '#fff',
              fontSize: 20,
              fontWeight: 700, // Inter ExtraBold
              lineHeight: 1.15,
            }}
          >
            {name}
          </h3>

          {isHot && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)',
                backgroundColor: 'rgba(0,0,0,0.20)',
                color: '#FFB020',
                fontWeight: 900,
                fontSize: 11,
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              <FaFireAlt />
              HOT
            </div>
          )}
        </div>

        {/* Linha */}
        <div
          style={{
            height: 1,
            backgroundColor: 'rgba(255,255,255,0.14)',
            marginTop: 10,
            marginBottom: 10,
          }}
        />

        {/* Local */}
        <div style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13.5, fontWeight: 500 }}>
          {location}
        </div>

        {/* Rodapé */}
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13, fontWeight: 500 }}>
            {liveCount} people here
          </div>

          <FaChevronRight style={{ color: 'rgba(255,255,255,0.35)' }} />
        </div>
      </div>
    </div>
  )
}
