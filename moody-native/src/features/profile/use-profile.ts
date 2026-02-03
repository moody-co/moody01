import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/src/auth/auth.hooks'
import { toUserMessage } from '@/src/shared/errors/ui-error'
import type { ProfileResponse } from './profile.types'
import { fetchProfile } from './profile.services'

export function useProfile() {
  const { authedFetch } = useAuth()

  const [data, setData] = useState<ProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const res = await fetchProfile(authedFetch)
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
