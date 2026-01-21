import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowRight, FaCheck, FaTimes, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

import { getEventById } from '../../mock/events'

type Crowded = 'empty' | 'medium' | 'full'
type Vibe = 'low' | 'ok' | 'lively'
type PromoActive = 'yes' | 'no'
type WorthIt = 'yes' | 'no'

const UI = {
  // Espaço entre subtítulo e formulário (empurra as perguntas para baixo)
  formTopMargin: 36, // ✅ era 22 (ajuste pedido)

  // Perguntas
  questionFontSize: 12,
  questionFontWeight: 800,

  // Botões das opções (Empty/Medium/Full etc)
  optionFontSize: 15,
  optionFontWeight: 500,

  // Botão submit
  submitFontSize: 14,
  submitFontWeight: 900,
}

export const QuickCheckinScreen = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()

  const event = useMemo(() => (eventId ? getEventById(eventId) : undefined), [eventId])

  const [crowded, setCrowded] = useState<Crowded | null>(null)
  const [vibe, setVibe] = useState<Vibe | null>(null)
  const [promoActive, setPromoActive] = useState<PromoActive | null>(null)
  const [worthIt, setWorthIt] = useState<WorthIt | null>(null)

  if (!eventId || !event) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100dvh', color: '#fff', padding: 24 }}>
        Evento não encontrado.
      </div>
    )
  }

  const canSubmit = !!(crowded && vibe && promoActive && worthIt)

  const submit = () => {
    const payload = { eventId, crowded, vibe, promoActive, worthIt, createdAt: new Date().toISOString() }
    console.log('QuickCheck-in payload:', payload)
    alert('Submitted! (mock)')
    navigate(`/app/discover/${eventId}/camera`)
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#000',
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
          background:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(19,1,49,1) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          padding: '26px 22px 150px 22px', 
        }}
      >
        {/* Top brand */}
        <div style={{ fontWeight: 700, letterSpacing: 0.5, fontSize: 30, opacity: 0.9 }}>MOODY</div>

        <div style={{ marginTop: 32, fontSize: 35, fontWeight: 700 }}>Quick Check-in</div>

        <div
          style={{
            marginTop: 8,
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 600,
            fontSize: 15,
            lineHeight: 1.35,
          }}
        >
          Help the community know what’s happening
          <br />
          at <span style={{ color: 'rgba(255,255,255,0.8)' }}>{event.title}</span> right now.
        </div>

        {/* Questions */}
        <div
          style={{
            marginTop: UI.formTopMargin, 
            display: 'grid',
            gap: 18,
          }}
        >
          <Question
            title="How crowded is it?"
            options={[
              { label: 'Empty', active: crowded === 'empty', onClick: () => setCrowded('empty') },
              { label: 'Medium', active: crowded === 'medium', onClick: () => setCrowded('medium') },
              { label: 'Full', active: crowded === 'full', onClick: () => setCrowded('full') },
            ]}
          />

          <Question
            title="How’s the vibe?"
            options={[
              { label: 'Low', iconLeft: '⟂', active: vibe === 'low', onClick: () => setVibe('low') },
              { label: 'OK', iconLeft: '◎', active: vibe === 'ok', onClick: () => setVibe('ok') },
              { label: 'Lively', iconLeft: '🔥', active: vibe === 'lively', onClick: () => setVibe('lively') },
            ]}
          />

          <Question
            title='Is the "2-for-1" promo active?'
            options={[
              {
                label: 'Yes',
                icon: <FaThumbsUp />,
                active: promoActive === 'yes',
                onClick: () => setPromoActive('yes'),
              },
              {
                label: 'No',
                icon: <FaThumbsDown />,
                active: promoActive === 'no',
                onClick: () => setPromoActive('no'),
              },
            ]}
          />

          <Question
            title="Worth going right now?"
            options={[
              {
                label: 'Yes',
                icon: <FaCheck />,
                active: worthIt === 'yes',
                onClick: () => setWorthIt('yes'),
                accent: 'green',
              },
              { label: 'No', icon: <FaTimes />, active: worthIt === 'no', onClick: () => setWorthIt('no') },
            ]}
          />
        </div>
      </div>

      {/* Submit fixed bottom */}
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 50,
        padding: '18px 18px 22px 18px',
        overflow: 'hidden',
        background: 'transparent',
        zIndex: 50,
      }}
    >
      <button
        type="button"
        onClick={submit}
        disabled={!canSubmit}
        style={{
          width: '100%',
          height: 60,
          borderRadius: 30,
          background: 'linear-gradient(180deg, #A279E8 0%, #5A2CA8 100%)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: 18,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          border: 'none',
          outline: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        Submit Review <FaArrowRight />
      </button>
    </div>

    </div>
  )
}

function Question({
  title,
  options,
}: {
  title: string
  options: Array<{
    label: string
    active: boolean
    onClick: () => void
    icon?: React.ReactNode
    iconLeft?: string
    accent?: 'green'
  }>
}) {
  return (
    <div>
      {/* fonte/peso da pergunta */}
      <div
        style={{
          fontSize: 18, // 🔧 mexe aqui
          fontWeight: 700, // 🔧 mexe aqui
          color: 'rgba(255,255,255,0.9)',
          marginTop: 4,
          marginBottom: 20,
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', gap: 13 }}>
        {options.map((opt) => (
          <OptionButton key={opt.label} {...opt} />
        ))}
      </div>
    </div>
  )
}

function OptionButton({
  label,
  active,
  onClick,
  icon,
  iconLeft,
  accent,
}: {
  label: string
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
  iconLeft?: string
  accent?: 'green'
}) {
  const border = active ? '1px solid rgba(198,175,237,0.55)' : '1px solid rgba(255,255,255,0.12)'

  const greenActive = 'rgba(57,255,20,0.20)'
  const greenBorder = '1px solid rgba(57,255,20,0.45)'

  const baseBg = 'rgba(255,255,255,0.06)'
  const activeBg = 'rgba(162,121,232,0.22)'

  const bg = active ? (accent === 'green' ? greenActive : activeBg) : baseBg
  const brd = active ? (accent === 'green' ? greenBorder : border) : border

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        height: 48,
        borderRadius: 10,
        background: bg,
        border: brd,
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,

        // fonte/peso dos botões de opção
        fontWeight: 600, 
        fontSize: 14
      }}
    >
      {icon ? <span style={{ opacity: 0.9 }}>{icon}</span> : null}
      {iconLeft ? <span style={{ opacity: 0.85 }}>{iconLeft}</span> : null}
      {label}
    </button>
  )
}
