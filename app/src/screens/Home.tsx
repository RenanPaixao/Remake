import React from 'react'
import { View } from 'react-native'
import { MainStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { supabase } from '../initSupabase'
import {
  Layout,
  Button,
  TopNav,
  Section,
  SectionContent
} from 'react-native-rapi-ui'

export default function Home({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  return (
    <Layout>
      <TopNav
        middleContent="Home"
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Section style={{ marginTop: 20 }}>
          <SectionContent>
            <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate('Companies')
              }}
              style={{
                marginTop: 10
              }}
            />
            <Button
              status="danger"
              text="Logout"
              onPress={async() => {
                const { error } = await supabase.auth.signOut()
                if (!error) {
                  alert('Signed out!')
                }
                if (error) {
                  alert(error.message)
                }
              }}
              style={{
                marginTop: 10
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  )
}
