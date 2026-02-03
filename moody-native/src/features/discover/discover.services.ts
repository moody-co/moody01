import type { DiscoverFeedResponse, Temperature } from './discover.types'

const USE_MOCK = true

type AuthedFetch = <T>(
  path: string,
  opts?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: any
    headers?: Record<string, string>
  }
) => Promise<T>

function normalizeTemp(isHot?: boolean): Temperature {
  return isHot ? 'Hot' : 'Warm'
}

export async function fetchDiscoverFeed(authedFetch: AuthedFetch): Promise<DiscoverFeedResponse> {
  if (USE_MOCK) {
    return {
      events: [
        {
          id: '1',
          title: 'The Neon Party',
          venueName: "Jocker's bar",
          peopleHere: 128,
          temperature: normalizeTemp(true),
          coverImageUrl:
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: '2',
          title: 'The Neon Party',
          venueName: "Jocker's bar",
          peopleHere: 120,
          temperature: normalizeTemp(true),
          coverImageUrl:
            'https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: '3',
          title: 'Disco Fever',
          venueName: 'Downtown Club',
          peopleHere: 76,
          temperature: normalizeTemp(false),
          coverImageUrl:
            'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    }
  }

  /**
   * Exemplo de integração futura (você só mexe AQUI):
   *
   * const dto = await authedFetch<{ events: any[] }>('/discover/feed', { method: 'GET' })
   * return mapDiscover(dto)
   */
  const dto = await authedFetch<DiscoverFeedResponse>('/discover/feed', { method: 'GET' })
  return dto
}
