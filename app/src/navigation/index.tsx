import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'

import { NavigationContainer } from '@react-navigation/native'

import Main from './MainStack'
import Auth from './AuthStack'
import Loading from '../screens/utils/Loading'

export default function Index() {
  const auth = useContext(AuthContext)
  const { user } = auth
  return (
    <NavigationContainer>
      {user === null && <Loading />}
      {user === false && <Auth />}
      {user === true && <Main />
      }
    </NavigationContainer>
  )
}
