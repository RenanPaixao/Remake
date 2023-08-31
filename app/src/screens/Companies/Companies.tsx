import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, StyleSheet, TouchableHighlight, View } from 'react-native'
import { MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, Text, TopNav } from 'react-native-rapi-ui'
import { CompaniesService } from '../../services/supabase/companiesService'
import CompanyCard from './CompanyCard'
import { useQuery } from '@tanstack/react-query'
import Loading from '../utils/Loading'
import { LocationContext } from '../../provider/LocationProvider'
import haversine from 'haversine-distance'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ButtonToMaps } from '../../components/ButtonToMaps/ButtonToMaps'
export default function Companies({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'Companies'>) {

  const { location, updateLocation } = useContext(LocationContext)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const { isLoading, data } = useQuery({
    queryKey: ['companies', location],
    staleTime: 1,
    refetchOnMount: true,
    cacheTime: 0,
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

  useEffect(()=>{
    setSelectedLocation(selectedCompany?.locations[0])
  }, [selectedCompany])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['25%'], [])
  const presentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  return (
    <Layout>
      <TopNav
        middleContent="Pontos de coleta"
      />
      <GestureHandlerRootView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 30
        }}
      >
        <Text fontWeight="bold" size="h2">Mais Próximos a voce!</Text>
        <View style={{ flexDirection: 'column', flex: 1, width: '90%', marginVertical: 30 }}>
          {
            isLoading ?
              <Loading />
              :
              <>
                <View style={{ display: 'flex', alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                  <Button
                    text={'Adicionar'}
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
                      onPress={() => {
                        setSelectedCompany(company)
                        presentModal()
                      }}
                      style={{ paddingVertical: 10, marginHorizontal: 5 }}
                      underlayColor="transparent"
                    >
                      <CompanyCard
                        id={company.id}
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
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={snapPoints}
            >
              <View style={styles.contentContainer}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10, marginBottom: 30 }}>
                  {selectedCompany?.name}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    outline
                    text={'Ver detalhes...'}
                    onPress={() => navigation.navigate('LocationDetails', selectedLocation)}
                  />
                  <ButtonToMaps latitude={selectedLocation?.latitude} longitude={selectedLocation?.longitude}/>
                </View>
              </View>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Layout >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '20%',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'absolute'
  },
  contentContainer: {
    flex: 1
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
})
