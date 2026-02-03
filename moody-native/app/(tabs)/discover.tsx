import React from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

import { useDiscoverFeed } from '@/src/features/discover/use-discover-feed'
import { PlaceCard } from '@/components/PlaceCard'
import { ScreenState } from '@/components/ui/ScreenState'

export default function DiscoverScreen() {
  const { data, loading, error, reload } = useDiscoverFeed()

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
              fontFamily: 'Inter_800ExtraBold',
              fontSize: 28,
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
            paddingHorizontal: 17,
            marginTop: 19,
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

      {/* Content */}
      {loading ? (
        <ScreenState variant="loading" title="Loading..." />
      ) : error ? (
        <ScreenState variant="error" message={error} onRetry={reload} />
      ) : (
        <FlatList
          data={data?.events ?? []}
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
              temperature={item.temperature}
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
          refreshing={loading}
          onRefresh={reload}
        />
      )}
    </View>
  )
}
