// FRONT: moody-native/src/features/tickets/use-tickets.ts
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/src/auth/auth.hooks'
import { toUserMessage } from '@/src/shared/errors/ui-error'
import type { TabKey, TicketsResponse } from './tickets.types'
import { fetchTickets } from './tickets.services'

export function useTickets(tab: TabKey) {
  const { authedFetch } = useAuth()

  const [data, setData] = useState<TicketsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const res = await fetchTickets(authedFetch, tab)
      setData(res)
    } catch (e) {
      setError(toUserMessage(e))
    } finally {
      setLoading(false)
    }
  }, [authedFetch, tab])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, reload: load }
}
