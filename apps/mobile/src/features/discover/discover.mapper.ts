import type { DiscoverEvent, DiscoverFeedResponse } from './discover.types'

type ApiDiscoverEventDTO = {
  id: string
  title: string
  venueName: string
  peopleHere?: number
  badges?: string[]
  coverImageUrl: string
  temperature?: string
}

export type ApiDiscoverResponseDTO = {
  events: ApiDiscoverEventDTO[]
}

export function mapDiscoverResponse(dto: ApiDiscoverResponseDTO): DiscoverFeedResponse {
  return {
    events: dto.events.map(mapDiscoverEvent),
  }
}

function mapDiscoverEvent(event: ApiDiscoverEventDTO): DiscoverEvent {
  return {
    id: event.id,
    title: event.title,
    venueName: event.venueName,
    peopleHere: event.peopleHere ?? 0,
    badges: event.badges ?? [],
    coverImageUrl: event.coverImageUrl,
    temperature: event.temperature,
  }
}
