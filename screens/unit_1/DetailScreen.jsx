import React from 'react'
import { View, Text } from 'react-native'

export default function DetailScreen({ route, navigation }) {
    // const { count } = route.params
    const { result } = route.params
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>{result}</Text>
        </View>
    )
}
