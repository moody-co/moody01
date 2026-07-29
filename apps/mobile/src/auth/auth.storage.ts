import * as SecureStore from 'expo-secure-store'

const ACCESS_TOKEN_KEY = 'moody.accessToken'
const REFRESH_TOKEN_KEY = 'moody.refreshToken'

// Salva ambos os tokens de uma vez
export async function saveTokens(accessToken: string, refreshToken: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken)
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
}

// Busca o token de acesso (usado em cada requisição)
export async function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
}

// Busca o token de atualização (usado quando o de acesso expira)
export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

// Apaga ambos ao fazer Logout
export async function deleteTokens() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}