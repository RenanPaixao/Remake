<<<<<<< Updated upstream
import React from 'react'
import { View } from 'react-native'
import { MainStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Layout, Text } from 'react-native-rapi-ui'
=======
import React, { useContext } from 'react'
import { MainStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, Text, TopNav } from 'react-native-rapi-ui'
import { supabase } from '../initSupabase'
import { Image, View } from 'react-native'
import { AuthContext } from '../provider/AuthProvider'
import { LocationContext } from '../provider/LocationProvider'
>>>>>>> Stashed changes

export default function Profile({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  const { session } = useContext(AuthContext)
  const { location } = useContext(LocationContext)
  const {userMetadata} = useContext(AuthContext)

  const userName = userMetadata?.first_name
  const userEmail = session?.user?.email
  const userPhone = session?.user?.phone
  const latitude = location?.coords.latitude
  const longitude = location?.coords.longitude

  return (
    <Layout>
<<<<<<< Updated upstream
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>This is the Profile tab</Text>
=======
      <TopNav middleContent="Perfil" />
      <View style={{
        backgroundColor: 'white',
        alignItems: 'center'
      }}>
        <Image
          style={{
            borderRadius: 50,
            marginTop: 20,
            marginBottom: 20,
            height: 100,
            width: 100
          }}
          resizeMode="center"
          source={require('../../assets/images/profilePlaceholder.webp')}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{color:'#6E8963'}} size='h3'>{userName}</Text>

      </View>

      <View style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 50,
        marginLeft: 15,
        gap: 10
      }}>
        <Text style={{color:'#6E8963'}}size='xl'>Email:</Text>
        <Text style={{
        }}>{userEmail}</Text>
      </View>

      <View style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 15,
        gap: 10
      }}>
        <Text style={{color:'#6E8963'}} size='xl'>Senha:</Text>
        <Text style={{
        }}>testesenha</Text>
      </View>

      <View style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 15,
        gap: 10
      }}>
        <Text style={{color:'#6E8963'}} size='xl'>Phone:</Text>
        <Text style={{
        }}>{userPhone}</Text>
      </View>

      <View style={{
        marginTop: 30,
        marginLeft: 15,
      }}>
        <Text style={{color:'#6E8963'}} size='xl'>Coordenadas:</Text>

      </View>

      <View style={{
        marginTop: 15,
        marginLeft: 15,

      }}>
        <Text style={{color:'#6E8963'}} size='sm'>Latitude: {latitude}</Text>
        <Text style={{color:'#6E8963'}} size='sm'>Longitude: {longitude}</Text>
      </View>


      <View style={{ marginTop: 100 }}>
        <Button
          text={'Logout'}
          onPress={async () => await supabase.auth.signOut()}
          status={'danger'}
        />
>>>>>>> Stashed changes
      </View>
    </Layout>
  )
}
