import React from 'react'
import { View, Image,TouchableOpacity, ImageBackground, TextInput, StyleSheet} from 'react-native'
import { MainStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, TopNav,Text } from 'react-native-rapi-ui'
import { supabase } from '../initSupabase'


export default function Profile({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  return (
    <Layout>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 50,
          alignItems: 'center',
        }}
      >
        <Text size='h2' fontWeight='bold'>Perfil</Text>
      </View>
      <View style={{
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
        <Image
        style={{
          marginTop: 20,
          marginBottom:20,
          height: 200,
          width: 200
        }}
        resizeMode="center"
        source={require('../../assets/images/usuario.png')}
        />
      </View>
      <View style={{
          marginTop:20,
          alignItems:'center',
      }}>
        <Text size='h3'>Nome do usuário</Text>
      </View>

      <View style={{
        marginTop:50,
        marginLeft:15,
        gap:10,
      }}>
        <Image
        style={{
          height:25,
          width:25,
        }}
          source={require('../../assets/images/email.png')}
        />
        <Text size='xl'>Email:</Text>
        <Text style={{
        }}>teste@email.com</Text>
      </View>

      <View style={{
        marginTop:30,
        marginLeft:15,
        gap:10
      }}>
        <Image
        style={{
          height:25,
          width:25,
        }}
          source={require('../../assets/images/senha.png')}
        />
        <Text size='xl'>Senha:</Text>
        <Text style={{
        }}>testesenha</Text>
      </View>
      <View style={{marginTop:25}}>
        <Button text={'Logout'} onPress={async() => await supabase.auth.signOut()} status={'danger'}/>
      </View>
    
    </Layout>
  )
}
