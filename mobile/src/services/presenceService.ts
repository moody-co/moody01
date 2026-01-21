import type { PresenceState } from '../types/presence'

const key = (eventId: string) => `moody:presence:${eventId}`

export function getPresence(eventId: string): PresenceState {
  const raw = localStorage.getItem(key(eventId))
  if (!raw) return { eventId, status: 'idle' }

  try {
    return JSON.parse(raw) as PresenceState
  } catch {
    return { eventId, status: 'idle' }
  }
}

export function setPresence(state: PresenceState) {
  localStorage.setItem(key(state.eventId), JSON.stringify(state))
}

// Mock “verificação”: hoje aprova sempre.
// Amanhã: vira chamada real no backend.
export async function verifyPresence(eventId: string): Promise<PresenceState> {
  // simula latência
  await new Promise((r) => setTimeout(r, 600))

  const next: PresenceState = {
    eventId,
    status: 'verified',
    verifiedAt: new Date().toISOString(),
  }
  setPresence(next)
  return next
}
