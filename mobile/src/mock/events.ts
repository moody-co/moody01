import type { Event, VibeKey } from '../types/moody'

export const mockEvents: Event[] = [
  {
    id: 'villa-mix',
    title: 'Villa Mix',
    venueName: 'Vila Olímpia',
    city: 'São Paulo - SP',
    distanceKm: 5.2,
    coverImageUrl:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    vibeKey: 'club',
    badges: ['HOT', 'FREE ENTRY'],
    peopleHere: 312,
    promo: {
      title: '2-for-1 Drinks',
      validUntil: '11:00 PM',
    },
    vibe: {
      crowd: 'Packed',
      music: 'Pop / Funk',
      dj: 'DJ MauMau',
      openUntil: '4:00 AM',
    },
    liveCheckins: [
      {
        id: 'c1',
        userName: 'Ana',
        message: 'Tá lotado e animado demais 🔥',
        minutesAgo: 3,
      },
      {
        id: 'c2',
        userName: 'Lucas',
        message: 'Promo rolando, vale MUITO!',
        minutesAgo: 8,
      },
    ],
  },
  {
    id: 'audio-club',
    title: 'Audio Club',
    venueName: 'Barra Funda',
    city: 'São Paulo - SP',
    distanceKm: 7.8,
    coverImageUrl:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    vibeKey: 'bar',
    badges: ['HOT'],
    peopleHere: 188,
    promo: {
      title: 'Open Beer',
      validUntil: '10:30 PM',
    },
    vibe: {
      crowd: 'Busy',
      music: 'House / EDM',
      dj: 'DJ Carol',
      openUntil: '3:00 AM',
    },
    liveCheckins: [
      {
        id: 'c3',
        userName: 'Bia',
        message: 'Som bom e clima top, mas fila grande.',
        minutesAgo: 5,
      },
      {
        id: 'c4',
        userName: 'Rafa',
        message: 'Cheguei agora, tá enchendo rápido.',
        minutesAgo: 12,
      },
    ],
  },
  {
    id: 'sushi-place',
    title: 'Sushi Night',
    venueName: 'Pinheiros',
    city: 'São Paulo - SP',
    distanceKm: 3.9,
    coverImageUrl:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80',
    vibeKey: 'food',
    badges: ['FREE ENTRY'],
    peopleHere: 74,
    promo: {
      title: 'Combo Especial',
      validUntil: '12:00 AM',
    },
    vibe: {
      crowd: 'Chill',
      music: 'Lounge',
      openUntil: '1:00 AM',
    },
    liveCheckins: [
      {
        id: 'c5',
        userName: 'Marina',
        message: 'Bem tranquilo, ótimo pra conversar.',
        minutesAgo: 6,
      },
    ],
  },
]

export function getEventById(eventId: string): Event | undefined {
  return mockEvents.find((e) => e.id === eventId)
}

export function filterEventsByVibe(vibe?: VibeKey | null): Event[] {
  if (!vibe) return mockEvents
  return mockEvents.filter((e) => e.vibeKey === vibe)
}
