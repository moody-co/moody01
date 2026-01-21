import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'

import { PlaceCard } from '../../components/PlaceCard'
import { filterEventsByVibe } from '../../mock/events'
import type { VibeKey } from '../../types/moody'

export const DiscoverListScreen = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const vibe = (params.get('vibe') as VibeKey | null) ?? null
  const events = useMemo(() => filterEventsByVibe(vibe), [vibe])

  return (
    <div
      style={{
        backgroundColor: '#000',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '60px 24px 10px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              color: '#A279E8', 
              fontFamily: 'Inter, system-ui, Arial',
              fontWeight: 600, 
              fontSize: 14,
              letterSpacing: 0.2,
            }}
          >
            Tonight in
          </div>

          <h2
            style={{
              margin: '6px 0 0 0',
              color: '#C6AFED', // São Paulo
              fontFamily: 'Inter, system-ui, Arial',
              fontWeight: 600, // semi-bold
              fontSize: 34,
              lineHeight: 1.05,
            }}
          >
            São Paulo - SP
          </h2>
        </div>

        {/* Map button */}
        <button
          type="button"
          onClick={() => alert('Mapa: depois a gente implementa')}
          style={{
            backgroundColor: '#130131',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#C6AFED',
            padding: '10px 16px',
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
            fontFamily: 'Inter, system-ui, Arial',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <FaMapMarkerAlt size={16} style={{ color: '#D284DE' }} />
          Map
        </button>
      </div>

      {/* List */}
      <div style={{ flex: 1, padding: '14px 24px 130px 24px', overflowY: 'auto' }}>
        {events.map((e) => (
          <div
            key={e.id}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/app/discover/${e.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') navigate(`/app/discover/${e.id}`)
            }}
          >
            <PlaceCard
              name={e.title}
              location={`${e.venueName}`}
              liveCount={e.peopleHere}
              temperature={e.badges?.includes('HOT') ? 'Hot' : 'Warm'}
              image={e.coverImageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
