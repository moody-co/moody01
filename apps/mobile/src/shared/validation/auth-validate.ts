export function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email.trim())
}

export function validatePassword(pw: string) {
  return pw.trim().length >= 6
}

export function validateUsername(u: string) {
  return u.trim().length >= 3
}

export function validateName(n: string) {
  return n.trim().length >= 2
}
