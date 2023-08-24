import React from 'react'
import { MainStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, TopNav } from 'react-native-rapi-ui'
import { supabase } from '../initSupabase'

export default function Profile({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  return (
    <Layout>
      <TopNav middleContent="Perfil" />
      <Button text={'Logout'} onPress={async () => await supabase.auth.signOut()} status={'danger'}/>
    </Layout>
  )
}
