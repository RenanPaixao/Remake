import React, { useContext, useEffect, useState } from 'react'
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
import { BrasilService } from '../../services/brasilApi/brasilApi'

export default function NewLocation({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  const { user } = useContext(AuthContext).session || {}

  const [ isLoading, setIsLoading ] = useState<boolean>(false)
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
    validateOnMount: true,
    validationSchema: companyFormSchema
  })

  useEffect(() => {
    async function getAddressByCep(cep: string) {
      try {
        const cepData = await BrasilService.getCep(cep)
        return {
          cep: companyFormProps.values.cep,
          street: cepData.street,
          city: cepData.city,
          state: cepData.state,
          district: cepData.neighborhood
        }
      } catch (e) {
        alert(e.message)
      }
    }

    (async () => {
      const onlyNumbersCep = companyFormProps.values.cep.replace(/\D/g, '')
      try {
        setIsLoading(true)
        if (onlyNumbersCep.length < 8) {
          return
        }

        const addressData = await getAddressByCep(onlyNumbersCep)
        for (const key in addressData) {
          await companyFormProps.setFieldValue(key, addressData[key])
        }
        return addressData
      } catch (e) {
        alert(e.message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [companyFormProps.values.cep])

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
        longitude: Number(companyFormProps.values.longitude),
        openning_hour: companyFormProps.values.openingHour,
        closing_hour: companyFormProps.values.closingHour
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
              loading={isLoading}
            />
            <Button text={'Adicionar'}
              disabled={isLoading || !companyFormProps.isValid}
              onPress={companyFormProps.submitForm}
            />
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  )
}
