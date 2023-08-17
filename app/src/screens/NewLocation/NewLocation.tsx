import React, { useContext } from 'react'
import { View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, themeColor, TopNav } from 'react-native-rapi-ui'
import { useFormik } from 'formik'
import { MainStackParamList } from '../../types/navigation'
import { schemaNormalize } from '../../utils/schemaNormalize'
import { CompaniesService, Company } from '../../services/supabase/companiesService'
import { LocationWithoutCoordinates } from '../../services/supabase/locationService'
import { CompanyForm, companyFormSchema, InitialCompanyFormValues } from '../auth/CompanyForm'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../provider/AuthProvider'

export default function NewLocation({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  const { user } = useContext(AuthContext).session || {}

  const [ isLoading, setIsLoading ] = React.useState<boolean>(false)

  const companyFormProps = useFormik<InitialCompanyFormValues>({
    initialValues: {
      companyName: 'a',
      cep: '55.818-025',
      number: '4',
      complement: 'test',
      district: 'bairro',
      city: 'cidade',
      state: 'pernamuco',
      street: 'rua'
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema: companyFormSchema
  })

  async function addCompany() {
    try {
      setIsLoading(true)
      const company = schemaNormalize<Company>({
        name: companyFormProps.values.companyName,
        owner_id: user?.id
      })

      const location = schemaNormalize<Omit<LocationWithoutCoordinates, 'company_id'>>({
        cep: companyFormProps.values.cep,
        number: Number(companyFormProps.values.number),
        complement: companyFormProps.values.complement,
        district: companyFormProps.values.district,
        city: companyFormProps.values.city,
        state: companyFormProps.values.state,
        name: companyFormProps.values.street
      })

      await CompaniesService.createCompanyWithLocation(company, location)
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
            <Button text={'Adicionar'} disabled={isLoading} onPress={addCompany}/>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  )
}
