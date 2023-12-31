import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBarIcon from '../components/utils/TabBarIcon'
import TabBarText from '../components/utils/TabBarText'
import { MainTabsParamList } from '../types/navigation'

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Companies from '../screens/Companies/Companies'

import '../utils/i18n'
import { useTranslation } from 'react-i18next'

const Tabs = createBottomTabNavigator<MainTabsParamList>()
const MainTabs = () => {
  const { t, i18n } = useTranslation()
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: '#c0c0c0',
          backgroundColor: '#ffffff'
        }
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title={t("Tela inicial")} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'md-home'} />
          )
        }}
      />
      <Tabs.Screen
        name="Companies"
        component={Companies}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title={t("Pontos de coleta")} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'location'} />
          )
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title={t("Perfil")} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'person'} />
          )
        }}
      />
    </Tabs.Navigator>
  )
}

export default MainTabs
