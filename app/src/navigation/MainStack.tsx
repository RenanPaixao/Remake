import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainTabs from './MainTabs'
import Companies from '../screens/Companies/Companies'
import { MainStackParamList } from '../types/navigation'
import Location from '../screens/locations/Location'

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
      <MainStack.Screen name="Location" component={Location} />
    </MainStack.Navigator>
  )
}

export default Main
