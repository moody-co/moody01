// src/auth/auth.storage.ts
import * as SecureStore from 'expo-secure-store'

const REFRESH_TOKEN_KEY = 'moody.refreshToken'

export async function saveRefreshToken(token: string) {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token)
}

export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

export async function deleteRefreshToken() {
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}
