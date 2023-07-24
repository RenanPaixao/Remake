import React from 'react'
import { themeColor } from 'react-native-rapi-ui'
import { Ionicons } from '@expo/vector-icons'

export default function TabBarIcon({ icon, focused }: { icon: any; focused: boolean }) {
  return (
    <Ionicons
      name={icon}
      style={{ marginBottom: -7 }}
      size={24}
      color={
        focused ? themeColor.primary : 'rgb(143, 155, 179)'
      }
    />
  )
}
