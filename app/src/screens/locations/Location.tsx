/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Layout, Section, SectionContent, Text, TopNav, themeColor } from 'react-native-rapi-ui'
import { FlatList, Image, View } from 'react-native'
import { MainStackParamList } from '../../types/navigation'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import CommentCard from './CommentCard'

interface ILocation {
    created_at: string,
    cep: string,
    name: string,
    state: string,
    number: string,
    complement: string,
    city: string,
    district: string,
    latitude: string,
    longitude: string,
    id: string,
    company_id: string,
    image_url: string
}

interface ILocationProps extends NativeStackScreenProps<MainStackParamList, 'MainTabs'> {
    location: ILocation
}

export default function Location(props: ILocationProps) {
  const { navigation } = props
  const [comments, setComments] = useState([])
  const formatDataToComments = (item: any) => {
    return ({
      profile: {
        name: item.user.name,
        img_url: item.user.img_url
      },
      comment: item.comment,
      avaliation: item.avaliation
    })
  }
  return (
    <Layout style={{ flex: 1 }} >
      <TopNav
        middleContent='Detalhes'
        middleTextStyle={{ fontSize: 24 }}
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <Section style={{
        alignItems: 'center',
        flex: 1
      }}>
        <FlatList
          data={comments}
          style={{
            flex: 1, marginVertical: 8,
            borderRadius: 10,
            marginBottom: 10
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <View style={{ alignSelf: 'center', marginVertical: 5 }}>
              <CommentCard {...formatDataToComments(item)} />
            </View>
          }
          ListHeaderComponent={() => <>
            <SectionContent padding={0} style={{
              alignItems: 'center'
            }}>
              <Text style={{ padding: 30 }} fontWeight="bold" size="h3">Mais Próximos a voce!</Text>
            </SectionContent>
            <Image style={{ width: 320, height: 150, marginBottom: 12 }} source={{ uri: 'https://www.paulistanorthwayshopping.com.br/wp-content/uploads/2023/07/card-site.png' }} />
            <SectionContent padding={0} style={{ flex: 1 }}>
              <SectionContent style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingVertical: 5 }}>
                <Text style={{ fontSize: 24, marginRight: 8, fontWeight: 'bold' }}>Lugar</Text>
                <StarRatingDisplay starSize={25} rating={3.5} starStyle={{ marginHorizontal: 0 }} />
              </SectionContent>

              <SectionContent style={{ paddingVertical: 5 }}>
                <Text>Av. Dos Navegantes, Recife/PE</Text>
                <Text style={{ marginTop: 8 }}>Aberto</Text>
              </SectionContent>

              <SectionContent padding={0} style={{ marginVertical: 10, height: 1, backgroundColor: '#A19E9E' }} ></SectionContent>
            </SectionContent>

          </>}
          showsVerticalScrollIndicator={false}
        />

      </Section>
    </Layout>

  )
}

