import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

// Better put your these secret keys in .env file
export const supabase = createClient(process.env.API_URL as string, process.env.API_KEY as string, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false // Prevents Supabase from evaluating window.location.href, breaking mobile
})
