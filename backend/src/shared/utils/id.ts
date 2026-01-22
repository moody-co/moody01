import crypto from 'crypto'

export function randomCode(size = 16) {
  return crypto.randomBytes(size).toString('hex')
}
