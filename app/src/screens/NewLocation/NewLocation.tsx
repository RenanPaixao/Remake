import React, { useContext, useEffect } from 'react'
import { View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, themeColor, TopNav } from 'react-native-rapi-ui'
import { useFormik } from 'formik'
import { MainStackParamList } from '../../types/navigation'
import { schemaNormalize } from '../../utils/schemaNormalize'
import { CompaniesService, Company } from '../../services/supabase/companiesService'
import { Location } from '../../services/supabase/locationService'
import { CompanyForm, companyFormSchema, InitialCompanyFormValues } from '../auth/CompanyForm'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../provider/AuthProvider'

export default function NewLocation({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  const { user } = useContext(AuthContext).session || {}

  const [ isLoading, setIsLoading ] = React.useState<boolean>(false)
  const [ canAdd, setCanAdd ] = React.useState<boolean>(false)

  const companyFormProps = useFormik<InitialCompanyFormValues>({
    initialValues: {
      companyName: '',
      cep: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
      street: '',
      openingHour: '',
      closingHour: '',
      latitude: '',
      longitude: ''
    },
    onSubmit: addCompany,
    validationSchema: companyFormSchema
  })

  useEffect(()=>{
    setCanAdd(companyFormProps.isValid ||
      (!isLoading && Object.keys(companyFormProps.touched).length > 0)
    )
    console.log(canAdd)
  }, [canAdd, companyFormProps.isValid, companyFormProps.touched, isLoading])

  async function addCompany() {
    if (!user) {
      return alert('Usuário não encontrado!')
    }

    try {
      setIsLoading(true)
      const company = schemaNormalize<Company>({
        name: companyFormProps.values.companyName,
        owner_id: user.id
      })

      const location = schemaNormalize<Omit<Location, 'company_id'>>({
        cep: companyFormProps.values.cep,
        number: Number(companyFormProps.values.number),
        complement: companyFormProps.values.complement,
        district: companyFormProps.values.district,
        city: companyFormProps.values.city,
        state: companyFormProps.values.state,
        name: companyFormProps.values.street,
        latitude: Number(companyFormProps.values.latitude),
        longitude: Number(companyFormProps.values.longitude)
      })

      await CompaniesService.createCompanyWithLocation(company, location)

      alert('Local de coleta adicionado com sucesso!')
      navigation.goBack()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1, display: 'flex' }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
        >

          <TopNav
            middleContent="Adicionar local de coleta"
            leftContent={
              <Ionicons
                name="chevron-back"
                size={20}
                color={themeColor.dark}
              />
            }
            leftAction={() => navigation.goBack()}
          />
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: themeColor.white
            }}
          >
            <CompanyForm
              {...companyFormProps}
            />
            <Button text={'Adicionar'}
              disabled={!canAdd}
              onPress={companyFormProps.submitForm}
            />
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  )
}
