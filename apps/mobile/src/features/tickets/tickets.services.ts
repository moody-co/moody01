import type { TicketsResponse, TabKey } from './tickets.types'

const USE_MOCK = true

type AuthedFetch = <T>(
  path: string,
  opts?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: any
    headers?: Record<string, string>
  }
) => Promise<T>

export async function fetchTickets(authedFetch: AuthedFetch, tab: TabKey): Promise<TicketsResponse> {
  if (USE_MOCK) {
    const upcoming = [
      {
        id: 't1',
        title: 'The Neon Party',
        venue: "Jocker’s Bar",
        dateLabel: 'Fri, Oct 24 • 23:00',
        status: 'ACTIVE' as const,
        badge: 'HOT' as const,
        coverUrl:
          'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        qrValue: 'moody://ticket/t1',
        codeLabel: 'NEON - 248 - XJ9',
      },
      {
        id: 't2',
        title: 'Midnight Session',
        venue: 'House Club',
        dateLabel: 'Sat, Oct 25 • 22:00',
        status: 'CONFIRMED' as const,
        badge: 'FREE ENTRY' as const,
        coverUrl:
          'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
        qrValue: 'moody://ticket/t2',
        codeLabel: 'MIDS - 902 - QK1',
      },
    ]

    const past = [
      {
        id: 'p1',
        title: 'Retro Night',
        venue: 'Downtown Lounge',
        dateLabel: 'Sat, Sep 14 • 21:00',
        status: 'CONFIRMED' as const,
        coverUrl:
          'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
        qrValue: 'moody://ticket/p1',
        codeLabel: 'RETR - 111 - AA0',
      },
    ]

    return { tickets: tab === 'upcoming' ? upcoming : past }
  }

  // Integração futura:
  // GET /tickets?tab=upcoming|past
  const dto = await authedFetch<TicketsResponse>(`/tickets?tab=${encodeURIComponent(tab)}`, { method: 'GET' })
  return dto
}
