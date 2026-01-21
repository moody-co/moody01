export type VibeKey = 'bar' | 'club' | 'food'

export interface EventPromo {
  title: string
  validUntil: string 
}

export interface EventVibe {
  crowd: string      
  music: string      
  dj?: string
  openUntil: string 
}

export interface LiveCheckin {
  id: string
  userName: string
  message: string
  minutesAgo: number
}

export interface Event {
  id: string
  title: string
  venueName: string
  city: string
  distanceKm: number

  coverImageUrl: string

  vibeKey: VibeKey
  badges?: string[]       
  peopleHere: number

  promo?: EventPromo
  vibe: EventVibe

  liveCheckins: LiveCheckin[]
}
