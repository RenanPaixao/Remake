import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ThemeProvider } from 'react-native-rapi-ui'
import Navigation from './src/navigation'
import { AuthProvider } from './src/provider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App() {
  const images = [
    require('./assets/images/login.png'),
    require('./assets/images/register.png'),
    require('./assets/images/forget.png')
  ]
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider images={images}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
        <StatusBar />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
