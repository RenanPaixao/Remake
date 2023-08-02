import React from 'react'
import { View } from 'react-native'
import { MainStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Layout, Text } from 'react-native-rapi-ui'

export default function Faq({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>This is the Faq tab</Text>
      </View>
    </Layout>
  )
}
