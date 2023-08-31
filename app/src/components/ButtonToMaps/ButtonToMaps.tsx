import { Button } from 'react-native-rapi-ui'
import openMap from 'react-native-open-maps'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ButtonToMapsProps {
  latitude: number
  longitude: number
  text?: string
}

const { t, i18n } = useTranslation()

export const ButtonToMaps: React.FC<ButtonToMapsProps> = ({ longitude, latitude, text }) =>
  <Button text={text ?? t('Ver no mapa')}
    onPress={() => openMap({
      longitude: longitude,
      latitude: latitude,
      end: `${latitude},${longitude}`
    })}
  />
