import { Platform } from 'react-native'

/**
 * Helper function to generate a box shadow style to IOS and Android platforms.
 *
 * @param xOffset
 * @param yOffset
 * @param shadowOpacity
 * @param shadowRadius
 * @param elevation
 * @param shadowColorIos
 * @param shadowColorAndroid
 */
export const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorIos?: string,
  shadowColorAndroid?: string
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius
    }
  }
  if (Platform.OS === 'android') {
    return {
      elevation,
      shadowColor: shadowColorAndroid
    }
  }

  throw new Error('Platform not supported!')
}
