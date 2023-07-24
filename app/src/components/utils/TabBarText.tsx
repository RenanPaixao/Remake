import React from 'react'
import { Text, themeColor } from 'react-native-rapi-ui'
export default function TabBarText({ title, focused }: { title: string; focused: boolean }) {
  return (
    <Text
      fontWeight="bold"
      style={{
        marginBottom: 5,
        color: focused ? themeColor.primary : 'rgb(143, 155, 179)',
        fontSize: 10
      }}
    >
      {title}
    </Text>
  )
}
