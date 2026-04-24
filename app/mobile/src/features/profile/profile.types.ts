export type ProfileStats = {
  checkins: number
  reviews: number
  saved: number
}

export type ProfileUser = {
  name: string
  username: string
  location: string
  bio: string
  avatarUrl?: string
  isOnline?: boolean
  stats: ProfileStats
  vibes: string[]
}

export type ProfileResponse = {
  user: ProfileUser
}
