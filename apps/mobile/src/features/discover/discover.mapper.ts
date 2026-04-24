// src/features/discover/discover.mapper.ts
import type { DiscoverFeedResponse, DiscoverVenue } from './discover.types'

// Aqui você converte DTO do backend -> modelo do app.

type ApiVenueDTO = {
  id: string
  name: string
  neighborhood?: string
  city?: string
  coverImageUrl?: string
  heat?: number
  tags?: string[]
}

type ApiDiscoverResponseDTO = {
  venues: ApiVenueDTO[]
}

export function mapDiscoverResponse(dto: ApiDiscoverResponseDTO): DiscoverFeedResponse {
  return {
    items: dto.venues.map((v) => ({
      type: 'venue' as const,
      venue: mapVenue(v),
    })),
  }
}

function mapVenue(v: ApiVenueDTO): DiscoverVenue {
  return {
    id: v.id,
    name: v.name,
    neighborhood: v.neighborhood,
    city: v.city,
    coverImageUrl: v.coverImageUrl,
    heat: v.heat,
    tags: v.tags ?? [],
  }
}
