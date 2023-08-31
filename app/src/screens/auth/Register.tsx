import React, { useState } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image
} from 'react-native'
import { AuthStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  Layout,
  Text,
  TextInput,
  Button,
  CheckBox,
  themeColor
} from 'react-native-rapi-ui'
import { UsersService } from '../../services/supabase/usersService'

export default function Register({
  navigation
}: NativeStackScreenProps<AuthStackParamList, 'Register'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [isRecycler, setIsRecycler] = useState<boolean>(false)

  async function register() {
    setLoading(true)
    await UsersService.signUp(email, password, {
      first_name: firstName,
      last_name: lastName,
      is_recycler: isRecycler
    })
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: themeColor.white100
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220
              }}
              source={require('../../../assets/images/register.png')}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: themeColor.white
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: 'center',
                padding: 30
              }}
            >
              Cadastro
            </Text>

            <Text>Nome</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Insira seu nome..."
              value={firstName}
              autoComplete="off"
              autoCorrect={false}
              onChangeText={(text) => setFirstName(text)}
            />

            <Text>Sobrenome</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Insira seu sobrenome..."
              value={lastName}
              autoComplete="off"
              autoCorrect={false}
              onChangeText={(text) => setLastName(text)}
            />

            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Insira seu email aqui..."
              value={email}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={{ marginTop: 15 }}>Senha</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Insira sua senha aqui..."
              value={password}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}
              onPress={() => setIsRecycler(!isRecycler)}
            >
              <CheckBox value={isRecycler} onValueChange={() => setIsRecycler(!isRecycler) }/>
              <Text> Sou um reciclador?</Text>
            </TouchableOpacity>

            <Button
              text={loading ? 'Carregando' : 'Criar uma conta'}
              onPress={async () => {
                await register()
              }}
              style={{
                marginTop: 20
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                justifyContent: 'center'
              }}
            >
              <Text size="md">Já tem conta?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login')
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5
                  }}
                >
                  Ir para o Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  )
}
