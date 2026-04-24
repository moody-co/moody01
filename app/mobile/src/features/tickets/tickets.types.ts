export type TicketStatus = 'ACTIVE' | 'CONFIRMED'
export type TicketBadge = 'HOT' | 'FREE ENTRY'

export type Ticket = {
  id: string
  title: string
  venue: string
  dateLabel: string
  status: TicketStatus
  badge?: TicketBadge
  coverUrl?: string
  qrValue: string
  codeLabel: string
}

export type TabKey = 'upcoming' | 'past'

export type TicketsResponse = {
  tickets: Ticket[]
}
