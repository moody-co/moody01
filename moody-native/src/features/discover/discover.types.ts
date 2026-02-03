// FRONT: moody-native/src/features/discover/discover.types.ts

export type Temperature = 'Hot' | 'Warm' | 'Cold'

export type DiscoverEvent = {
  id: string
  title: string
  venueName: string
  peopleHere: number
  temperature: Temperature
  coverImageUrl: string
}

export type DiscoverFeedResponse = {
  events: DiscoverEvent[]
}
