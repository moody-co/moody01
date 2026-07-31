import * as SecureStore from 'expo-secure-store'

const ACCESS_TOKEN_KEY = 'moody.accessToken'
const REFRESH_TOKEN_KEY = 'moody.refreshToken'

export async function saveRefreshToken(refreshToken: string): Promise<void> {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

export async function deleteRefreshToken(): Promise<void> {
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}

// Compatibilidade temporária com o cliente HTTP atual.
// Esta persistência será removida quando a autoridade de sessão for unificada.
export async function saveTokens(accessToken: string, refreshToken: string): Promise<void> {
  await Promise.all([
    SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
    SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
  ])
}

export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
}

export async function deleteTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
  ])
}
