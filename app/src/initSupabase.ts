import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const apiURL = process.env.EXPO_PUBLIC_API_URL
const apiKey = process.env.EXPO_PUBLIC_API_KEY

export const supabase = createClient(apiURL as string, apiKey as string, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false // Prevents Supabase from evaluating window.location.href, breaking mobile
})
