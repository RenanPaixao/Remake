import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Layout, Text, themeColor, TopNav } from 'react-native-rapi-ui'
import { CompaniesService } from '../../services/companies/companiesService'
import { Ionicons } from '@expo/vector-icons'
import CompanyCard from './CompanyCard'
import { useQuery } from '@tanstack/react-query'
import Loading from '../utils/Loading'

export default function Companies({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'Companies'>) {

  const { isLoading, data, error } = useQuery({
    queryKey: ['companies'],
    queryFn: CompaniesService.getAllWithLocations
  })

  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])


  return (
    <Layout>
      <TopNav
        middleContent="Companies"
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
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 50
        }}
      >
        <Text fontWeight="bold" size="h2">Mais Próximos a voce!</Text>
        <View style={{ flexDirection: 'column' }}>
          {
            isLoading ?
              <Loading />
              :
              <FlatList
                data={data}
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 30
                }}
                renderItem={({ item: company }) =>
                  <View style={{ marginTop: 10 }}
                    onTouchEnd={() => navigation.navigate('LocationDetails', company.locations[0])}>
                    <CompanyCard {...company} />
                  </View>
                }
              />
          }
        </View>
      </View>
    </Layout >
  )
}
