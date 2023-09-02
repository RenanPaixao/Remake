import { Button } from 'react-native-rapi-ui'
import openMap from 'react-native-open-maps'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ButtonToMapsProps {
  latitude: number
  longitude: number
  text?: string
}



export const ButtonToMaps: React.FC<ButtonToMapsProps> = ({ longitude, latitude, text }) => {
  const { t } = useTranslation()

  return (
    <Button
      text={text ?? t('Ver no mapa')}
      color='#6E8963'
      onPress={() => openMap({
        longitude: longitude,
        latitude: latitude,
        end: `${latitude},${longitude}`
      })}
    />
  )
}