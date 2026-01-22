import { View, Text, Pressable, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

import { PlaceCard } from '../../components/PlaceCard'

type Event = {
  id: string
  title: string
  venueName: string
  peopleHere: number
  badges?: string[]
  coverImageUrl: string
}

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'The Neon Party',
    venueName: "Jocker's bar",
    peopleHere: 128,
    badges: ['HOT'],
    coverImageUrl:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    title: 'The Neon Party',
    venueName: "Jocker's bar",
    peopleHere: 120,
    badges: ['HOT'],
    coverImageUrl:
      'https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    title: 'Disco Fever',
    venueName: 'Downtown Club',
    peopleHere: 76,
    badges: [],
    coverImageUrl:
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function DiscoverScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Header */}
      <View
        style={{
          paddingTop: 60,
          paddingHorizontal: 24,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              color: '#A279E8',
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              letterSpacing: 0.2,
            }}
          >
            Tonight in
          </Text>

          <Text
            style={{
              marginTop: 6,
              color: '#C6AFED',
              fontFamily: 'Inter_600SemiBold',
              fontSize: 30,
              lineHeight: 36,
            }}
          >
            São Paulo - SP
          </Text>
        </View>

        {/* Map button */}
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: '#130131',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 999,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Ionicons name="location" size={16} color="#D284DE" />
          <Text style={{ color: '#C6AFED', fontFamily: 'Inter_600SemiBold', fontSize: 14 }}>Map</Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 14,
          paddingBottom: 130,
        }}
        renderItem={({ item }) => (
          <PlaceCard
            name={item.title}
            location={item.venueName}
            liveCount={item.peopleHere}
            temperature={item.badges?.includes('HOT') ? 'Hot' : 'Warm'}
            image={item.coverImageUrl}
            onPress={() =>
              router.push(
                {
                  pathname: '/event/[eventId]',
                  params: { eventId: item.id },
                } as any
              )
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
