import React, { useContext, useEffect } from 'react'
import { FlatList, TouchableHighlight, View } from 'react-native'
import { MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, Text, TopNav } from 'react-native-rapi-ui'
import { CompaniesService } from '../../services/supabase/companiesService'
import CompanyCard from './CompanyCard'
import { useQuery } from '@tanstack/react-query'
import Loading from '../utils/Loading'
import { LocationContext } from '../../provider/LocationProvider'
import haversine from 'haversine-distance'
import { useTranslation } from 'react-i18next'

export default function Companies({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'Companies'>) {

  const { location, updateLocation } = useContext(LocationContext)
  const { t, i18n } = useTranslation()

  const { isLoading, data } = useQuery({
    queryKey: ['companies', location],
    queryFn: async () => {
      if (!location) {
        return await CompaniesService.getAllWithLocations()
      }

      return await CompaniesService.getCompaniesSortedByProximity({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    }
  })

  useEffect(() => {
    (async () => {

      try {
        await updateLocation()
      } catch (e) {
        console.error(e)
      }
    })()
  }, [updateLocation])

  return (
    <Layout>
      <TopNav
        middleContent={t("Pontos de coleta")}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 30
        }}
      >
        <Text fontWeight="bold" size="h2">{t('Mais Próximos a voce!')}</Text>
        <View style={{ flexDirection: 'column', flex: 1, width: '90%', marginVertical: 30 }}>
          {
            isLoading ?
              <Loading />
              :
              <>
                <View style={{ display: 'flex', alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                  <Button
                    text={t('Adicionar')}
                    size={'md'} width={100}
                    onPress={() => navigation.navigate('NewLocation')}
                  />
                </View>
                <FlatList
                  data={data}
                  style={{
                    paddingHorizontal: 30
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

                    return <TouchableHighlight
                      onPress={() => navigation.navigate('LocationDetails', company.locations[0])}
                      style={{ paddingVertical: 10, marginHorizontal: 5 }}
                      underlayColor="transparent"
                    >
                      <CompanyCard id={company.id}
                        name={company.name}
                        location={nearerCompanyLocation}
                        distance={distance}
                      />
                    </TouchableHighlight>
                  }}
                />
              </>
          }
        </View>
      </View>
    </Layout >
  )
}
