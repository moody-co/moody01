import { ApiError } from '@/src/config/api'

export function toUserMessage(err: unknown) {
  if (err instanceof ApiError) {
    const msg = (err.payload as any)?.message
    return msg || err.message || 'Erro na requisição'
  }
  if (err instanceof Error) return err.message
  return 'Algo deu errado. Tente novamente.'
}
