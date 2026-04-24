// FRONT: moody-native/src/features/discover/discover.service.ts
import type { DiscoverFeedResponse } from './discover.types'

const USE_MOCK = true

type AuthedFetch = <T>(
  path: string,
  opts?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: any
    headers?: Record<string, string>
  }
) => Promise<T>

export async function fetchDiscoverFeed(authedFetch: AuthedFetch): Promise<DiscoverFeedResponse> {
  if (USE_MOCK) {
    return {
      events: [
        {
          id: '1',
          title: 'The Neon Party',
          venueName: "Jocker's bar",
          peopleHere: 128,
          badges: ['HOT'],
          coverImageUrl:
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
          temperature: 'Hot',
        },
        {
          id: '2',
          title: 'The Neon Party',
          venueName: "Jocker's bar",
          peopleHere: 120,
          badges: ['HOT'],
          coverImageUrl:
            'https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1200&q=80',
          temperature: 'Hot',
        },
        {
          id: '3',
          title: 'Disco Fever',
          venueName: 'Downtown Club',
          peopleHere: 76,
          badges: [],
          coverImageUrl:
            'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
          temperature: 'Warm',
        },
      ],
    }
  }

  // Integração futura:
  // GET /discover
  return await authedFetch<DiscoverFeedResponse>('/discover', { method: 'GET' })
}
