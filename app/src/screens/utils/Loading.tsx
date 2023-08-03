import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { SectionContent, themeColor } from 'react-native-rapi-ui'

export default function Loading() {
  return (
    <SectionContent>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator size="large" color={themeColor.primary} />
      </View>
    </SectionContent>
  )
}
