import { Button } from 'react-native-rapi-ui'
import openMap from 'react-native-open-maps'
import React from 'react'

interface ButtonToMapsProps{
  latitude: number
  longitude: number
  text?: string
}

export const ButtonToMaps: React.FC<ButtonToMapsProps> = ({ longitude, latitude, text }) => <Button
  text={text ?? 'Ver no mapa'}
  onPress={() => openMap({
    longitude: longitude,
    latitude: latitude,
    end: `${latitude},${longitude}`
  })}
/>
