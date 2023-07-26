import React, { useContext, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Layout, Text, themeColor, TopNav } from 'react-native-rapi-ui'
import { CompaniesService } from '../../services/companies/companiesService'
import { Ionicons } from '@expo/vector-icons'
import CompanyCard from './CompanyCard'
import { useQuery } from '@tanstack/react-query'
import Loading from '../utils/Loading'
import { LocationContext } from '../../provider/LocationProvider'
import haversine from 'haversine-distance'

export default function Companies({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {

  const { location, updateLocation } = useContext(LocationContext)

  const { isLoading, data } = useQuery({
    queryKey: ['companies', location],
    queryFn: async() => {
      if (!location) {
        console.log('Location not found!')
        return await CompaniesService.getAllWithLocations()
      }

      return await CompaniesService.getCompaniesSortedByProximity({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    }
  })

  useEffect(() => {
    (async() => {

      try {
        await updateLocation()
      } catch (e) {
        console.log(e)
      }
    })()
  }, [updateLocation])


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
        <View style={{ flexDirection: 'column', paddingVertical: 2, flex: 1, width: '90%' }}>
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
                ListEmptyComponent={() => (
                  <View>
                    <Text>Nenhum ponto de entrega encontrado</Text>
                  </View>
                )}
                renderItem={({ item: company }) => {
                  //The first company is the nearer already
                  const nearerCompanyLocation = company.locations[0]
                  const distance = location ? haversine(nearerCompanyLocation, {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                  }) : 0

                  return <View style={{ paddingVertical: 10, marginHorizontal: 5 }}>
                    <CompanyCard id={company.id}
                      name={company.name}
                      location={nearerCompanyLocation}
                      distance={distance}
                    />
                  </View>
                }}
              />
          }
        </View>
      </View>
    </Layout>
  )
}
