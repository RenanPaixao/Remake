import React, { createContext, useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

type ContextProps = {
	location: null | LocationObject
  updateLocation: () => Promise<void>
  updateLocationPermission: () => Promise<void>
};

// The type is weakly enforced because I cannot get the function that are inside the provider.
// Let it with an empty object shows errors without the type.
const LocationContext = createContext<ContextProps>({} as ContextProps)

interface Props {
	children: React.ReactNode;
}

const LocationProvider = (props: Props) => {
  const [location, setLocation] = useState<null | LocationObject>(null)
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean>(false)

  async function updateLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync()
    setHasLocationPermission(status === 'granted')
  }
  async function updateLocation() {
    if (!hasLocationPermission) {
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  useEffect(() => {
    (async() => {
      await updateLocationPermission()
    })()
  }, [])

  useEffect(() => {
    console.log('Location:', { latitude: location?.coords.latitude, longitude: location?.coords.longitude })
  }, [location])

  return (
    <LocationContext.Provider
      value={{
        location,
        updateLocation,
        updateLocationPermission
      }}
    >
      {props.children}
    </LocationContext.Provider>
  )
}

export { LocationContext, LocationProvider }
