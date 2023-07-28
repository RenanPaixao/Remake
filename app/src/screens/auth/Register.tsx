import React, { useEffect, useState } from 'react'
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
import {
  Layout,
  Text,
  TextInput,
  Button,
  CheckBox,
  themeColor
} from 'react-native-rapi-ui'
import { CompanyForm, companyFormSchema, InitialCompanyFormValues } from './CompanyForm'
import { useFormik } from 'formik'

export default function Register({
  navigation
}: NativeStackScreenProps<AuthStackParamList, 'Register'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [amIRecycler, setAmIRecycler] = useState<boolean>(false)

  const companyFormProps = useFormik<InitialCompanyFormValues>({
    initialValues: {
      companyName: '',
      cep: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
      street: ''
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema: companyFormSchema
  })

  useEffect(() => {
    console.log(companyFormProps.values)
  }, [companyFormProps.values])

  async function register() {
    setLoading(true)
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    if (!error && !user) {
      setLoading(false)
      alert('Check your email for the login link!')
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

            <Text style={{ marginTop: 15 }}>Password</Text>
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
              onPress={() => setAmIRecycler(!amIRecycler)}
            >
              <CheckBox value={amIRecycler} onValueChange={() => setAmIRecycler(!amIRecycler) }/>
              <Text> Sou um reciclador?</Text>
            </TouchableOpacity>


            {amIRecycler && (
              <>
                <Text size={'xl'} fontWeight={'bold'} style={{ marginTop: 30, textAlign: 'center' }}>Compania</Text>
                <CompanyForm
                  {...companyFormProps}
                />
              </>
            )}

            <Button
              text={loading ? 'Carregando' : 'Criar uma conta'}
              onPress={() => {
                register()
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
