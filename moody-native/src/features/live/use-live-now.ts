// FRONT: moody-native/src/features/live/use-live-now.ts
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/src/auth/auth.hooks'
import { toUserMessage } from '@/src/shared/errors/ui-error'
import { fetchLiveNow } from './live.services'
import type { LiveNowResponse, LiveTab } from './live.types'

export function useLiveNow(tab: LiveTab) {
  const { authedFetch } = useAuth()

  const [data, setData] = useState<LiveNowResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const res = await fetchLiveNow(authedFetch, tab)
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
