import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/src/auth/auth.hooks'
import { toUserMessage } from '@/src/shared/errors/ui-error'
import type { DiscoverFeedResponse } from './discover.types'
import { fetchDiscoverFeed } from './discover.services'

export function useDiscoverFeed() {
  const { authedFetch } = useAuth()

  const [data, setData] = useState<DiscoverFeedResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const res = await fetchDiscoverFeed(authedFetch)
      setData(res)
    } catch (e) {
      setError(toUserMessage(e))
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, reload: load }
}
