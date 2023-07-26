import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainTabs from './MainTabs'
import Companies from '../screens/Companies/Companies'
import { MainStackParamList } from '../types/navigation'

const MainStack = createNativeStackNavigator<MainStackParamList>()
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Companies" component={Companies} />
    </MainStack.Navigator>
  )
}

export default Main
