import React from 'react'
import { Text } from 'react-native-rapi-ui'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { generateBoxShadowStyle } from '../../utils/styles'
import { themeColor } from 'react-native-rapi-ui'

interface Location {
  latitude: number,
  longitude: number,
  created_at: string,
  cep: string,
  name: string,
  number: string | null,
  complement: string | null,
  city: string,
  district: string,
  state: string,
  id: string,
  company_id: string
}
interface CompanyCardProps {
  id: string,
  name: string,
  locations: Location[]
}
export default function CompanyCard(props: CompanyCardProps) {
  const [firstLocation] = props.locations
  const formatAddress = (location: Location) => {
    if (location) {
      return `${location.name}, ${location.district}, ${location.number}`
    }
    return null
  }

  const address = formatAddress(firstLocation)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 10,
      height: 100,
      backgroundColor: themeColor.white
    },
    shadow: generateBoxShadowStyle(-2, 4, 0.3, 3, 5)
  })
  return (
    <View
      style={[styles.container, styles.shadow]}
    >
      {
        address && (
          <View style={[{ display: 'flex', flex: 1, height: '100%' }]}>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
              <Text fontWeight="bold" size="lg" style={{ textTransform: 'capitalize' }}>{props.name}</Text>
              <Text style={{ marginLeft: 'auto' }}>800m</Text>
            </View>
            <Text style={{ marginTop: 'auto' }} size="md">{address}</Text>
          </View>
        )
      }
    </View>
  )
}
