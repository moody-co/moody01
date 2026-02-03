// FRONT: moody-native/src/features/live/live.types.ts

export type LiveTab = 'all' | 'clubs' | 'bars' | 'restaurants'

export type LiveHero = {
  id: string
  name: string
  category: string
  distanceKm: number
  statusLeft: string // ex: "Full"
  statusMid: string // ex: "Lively"
  statusRight: string // ex: "2m ago"
  heroUrl: string
  peakNow?: boolean
}

export type BusyCard = {
  id: string
  title: string
  place: string
  subtitle: string
  timeTag: string
  thumbUrl: string
}

export type LiveNowResponse = {
  hero: LiveHero
  busy: BusyCard[]
}
