import React, { useState } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image
} from 'react-native'
import { supabase } from '../../initSupabase'
import { AuthStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'

import {
  Layout,
  Text,
  TextInput,
  Button,
  themeColor
} from 'react-native-rapi-ui'


export default function Login({
  navigation
}: NativeStackScreenProps<AuthStackParamList, 'Login'>) {
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const changeLanguage = (value: string) =>{ 
    i18n.changeLanguage(value)
  }
  async function login() {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password
    })
    if (!error && !user) {
      setLoading(false)
      alert('Verifique seu email para o')
    }
    if (error) {
      setLoading(false)
      alert(error.message)
    }
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
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',

            }}
          >
            <TouchableOpacity onPress={()=> changeLanguage('pt')}>
              <Image
                resizeMode="contain"
                style={{
                  height: 40,
                  width: 40,
                  marginHorizontal: 15
                }}
                source={require('../../../assets/images/brasil.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> changeLanguage('en')}>
              <Image
                resizeMode="contain"
                style={{
                  height: 40,
                  width: 40
                }}
                source={require('../../../assets/images/eua.png')}
              />
            </TouchableOpacity>

          </View>
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
              source={require('../../../assets/images/login.png')}
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
              style={{
                alignSelf: 'center',
                padding: 30
              }}
              size="h3"
            >
              Login
            </Text>
            {/*TODO: remove it after development*/}
            <Button size='md' text={t('Test login')} onPress={async () => {
              setEmail('test@test.com')
              setPassword('12345678')
              await login()
            }} />
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder={t('Digite seu email')}
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
              placeholder={t('Digite sua senha')}
              value={password}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              text={loading ? t('Carregando') : t('Continue')}
              onPress={async () => {
                await login()
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
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text size="md">{t('Não tem uma conta?')}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register')
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5
                  }}
                >
                  {t('Registre-se aqui')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgetPassword')
                }}
              >
                <Text size="md" fontWeight="bold">
                {t('Esqueceu a senha?')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  )
}
