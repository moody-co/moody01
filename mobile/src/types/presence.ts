export type PresenceStatus = 'idle' | 'verifying' | 'verified' | 'rejected'

export interface PresenceState {
  eventId: string
  status: PresenceStatus
  verifiedAt?: string // ISO
}
