import { View, Text } from 'react-native'

export default function Tickets() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 24,
          fontWeight: '700',
        }}
      >
        Tickets
      </Text>
    </View>
  )
}
