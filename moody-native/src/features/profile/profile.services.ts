import type { ProfileResponse } from './profile.types'

const USE_MOCK = true

type AuthedFetch = <T>(
  path: string,
  opts?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: any
    headers?: Record<string, string>
  }
) => Promise<T>

export async function fetchProfile(authedFetch: AuthedFetch): Promise<ProfileResponse> {
  if (USE_MOCK) {
    return {
      user: {
        name: 'Sarah Mitchell',
        username: '@sarah_m',
        location: 'São Paulo - SP',
        bio: 'Nightlife enthusiast & electronic music lover. Always looking for the next best vibe',
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        isOnline: true,
        stats: { checkins: 42, reviews: 18, saved: 156 },
        vibes: ['Bar / Drinks', 'Club / Party'],
      },
    }
  }

  // Integração futura:
  // GET /me
  const dto = await authedFetch<ProfileResponse>('/me', { method: 'GET' })
  return dto
}
