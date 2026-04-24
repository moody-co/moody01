// FRONT: moody-native/src/features/discover/discover.types.ts

export type DiscoverEvent = {
  id: string
  title: string
  venueName: string
  peopleHere: number
  badges?: string[]
  coverImageUrl: string
  temperature?: 'Hot' | 'Warm' | 'Cold' | string
}

/**
 * Mesmo que você ainda não use no Discover agora,
 * esse tipo é útil quando você tiver tela de Venue/Place.
 * E ele resolve o erro do VSCode "DiscoverVenue não exportado".
 */
export type DiscoverVenue = {
  id: string
  name: string
  category?: string
  distanceKm?: number
  coverImageUrl?: string
}

export type DiscoverFeedResponse = {
  events: DiscoverEvent[]
}
