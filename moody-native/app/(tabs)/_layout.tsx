import { Tabs } from 'expo-router'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#130131',
          borderTopWidth: 0,
          height: 86,
          paddingTop: 10,
          paddingBottom: 18,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 6,
        },

        tabBarActiveTintColor: '#C6AFED',   
        tabBarInactiveTintColor: '#A279E8', 

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'compass-outline'
          if (route.name === 'tickets') iconName = focused ? 'ticket' : 'ticket-outline'
          if (route.name === 'live') iconName = focused ? 'radio' : 'radio-outline'
          if (route.name === 'discover') iconName = focused ? 'compass' : 'compass-outline'
          if (route.name === 'profile') iconName = focused ? 'person' : 'person-outline'

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={iconName} size={24} color={color} />
            </View>
          )
        },
      })}
    >
      <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
      <Tabs.Screen name="live" options={{ title: 'Live' }} />
      <Tabs.Screen name="tickets" options={{ title: 'Tickets' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      
    </Tabs>
  )
}
