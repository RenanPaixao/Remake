import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import {API_URL, API_KEY} from '@env'

// Better put your these secret keys in .env file
export const supabase = createClient(API_URL, API_KEY, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false // Prevents Supabase from evaluating window.location.href, breaking mobile
})
