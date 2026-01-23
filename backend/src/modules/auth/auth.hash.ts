import { createHash, timingSafeEqual } from 'crypto'

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export function safeCompare(a: string, b: string) {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}
