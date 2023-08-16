import React, { useContext, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainTabs from './MainTabs'
import NewLocation from '../screens/NewLocation/NewLocation'
import Companies from '../screens/Companies/Companies'
import { MainStackParamList } from '../types/navigation'
import LocationDetails from '../screens/locations/LocationDetails'
import { LocationContext } from '../provider/LocationProvider'
import Faq from '../screens/Faq/Faq'

const MainStack = createNativeStackNavigator<MainStackParamList>()
const Main = () => {
  const { updateLocation } = useContext(LocationContext)

  useEffect(() => {
    (async () => {
      await updateLocation()
    })()
  }, [])
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Companies" component={Companies} />
      <MainStack.Screen name="LocationDetails" component={LocationDetails} />
      <MainStack.Screen name="NewLocation" component={NewLocation} />
      <MainStack.Screen name="Faq" component={Faq} />
    </MainStack.Navigator>
  )
}

export default Main
