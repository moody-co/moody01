// FRONT: moody-native/src/features/live/live.service.ts
import type { LiveNowResponse } from './live.types'

/**
 * Camada de dados do LIVE.
 * A tela não usa mock direto.
 * Quando o backend estiver pronto:
 * - USE_MOCK=false
 * - troca endpoint /live/now e pronto
 */

const USE_MOCK = true

type AuthedFetch = <T>(
  path: string,
  opts?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: any
    headers?: Record<string, string>
  }
) => Promise<T>

export async function fetchLiveNow(authedFetch: AuthedFetch, tab: string): Promise<LiveNowResponse> {
  if (USE_MOCK) {
    // Mock base (pode variar por tab no futuro)
    return {
      hero: {
        id: 'nebula',
        name: 'Nebula Club',
        category: tab === 'bars' ? 'Cocktail Bar' : tab === 'restaurants' ? 'Restaurant' : 'Nightclub',
        distanceKm: 0.3,
        statusLeft: 'Full',
        statusMid: 'Lively',
        statusRight: '2m ago',
        peakNow: true,
        heroUrl:
          'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
      },
      busy: [
        {
          id: 'covoid',
          title: 'The Void',
          place: 'Cocktail Bar',
          subtitle: 'Check-ins spiking',
          timeTag: 'Just now',
          thumbUrl:
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 'echo',
          title: 'Echo Hall',
          place: 'Live Music',
          subtitle: 'Band started',
          timeTag: '5 min ago',
          thumbUrl:
            'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=200&q=80',
        },
      ],
    }
  }

  // Integração futura:
  // Exemplo: GET /live/now?tab=clubs
  // const dto = await authedFetch<LiveNowResponse>(`/live/now?tab=${encodeURIComponent(tab)}`, { method: 'GET' })
  // return dto

  const dto = await authedFetch<LiveNowResponse>(`/live/now?tab=${encodeURIComponent(tab)}`, { method: 'GET' })
  return dto
}
