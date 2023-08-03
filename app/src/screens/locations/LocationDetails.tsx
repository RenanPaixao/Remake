import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Layout, Section, SectionContent, Text, TopNav, themeColor } from 'react-native-rapi-ui'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { MainStackParamList } from '../../types/navigation'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import CommentCard from './CommentCard'
import { CommentsService, IComment } from '../../services/comments/commentsService'
import Loading from '../utils/Loading'
import { useQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'
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
  openning_hour: string
  closing_hour: string
}

interface ILocationProps extends NativeStackScreenProps<MainStackParamList, 'LocationDetails'> {
}

export default function LocationDetails(props: ILocationProps) {
  const { navigation, route } = props
  const location = (route?.params || {}) as ILocation

  function useComments(id: string) {
    return useQuery ({
      queryKey: ['comment', id],
      cacheTime: 0,
      staleTime: 1,
      queryFn: () => CommentsService.getAllCommentsFromLocation(id)
    })
  }
  const { error, data, isLoading } = useComments(location.id)
  useEffect(() => {
    if (error) {
      console.log(error)
    }
  })

  const getLocationAverageRating = (comments: IComment[]) => {
    return (comments.reduce((avaliationSum, item) => avaliationSum + (item?.avaliation || 0), 0) / comments.length)
  }
  const formatDataToComments = (item: IComment) => {
    return ({
      profile: {
        name: item.users.meta_data?.name,
        img_url: item.users.meta_data?.img_url || ''
      },
      comment: item.comment,
      avaliation: item.avaliation
    })
  }
  const isOpen = (location: ILocation) => {
    const zone = 'America/Recife'
    const format = 'yyyy-M-d HH:mm'

    const now = DateTime.now().setZone(zone)
    const openningDate = DateTime.fromFormat(
      `${now.year}-${now.month}-${now.day} ` + location.openning_hour,
      format,
      { zone })
    const closingDate = DateTime.fromFormat(
      `${now.year}-${now.month}-${now.day} ` + location.closing_hour,
      format,
      { zone })

    return now.toMillis() >= openningDate.toMillis() && now.toMillis() <= closingDate.toMillis()
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
        rightContent={
          <Ionicons
            name="add-sharp"
            size={20}
            color={themeColor.dark}
          />
        }
        rightAction={() => navigation.navigate('CommentForm', location.id)}
      />
      <Section style={{
        alignItems: 'center',
        flex: 1
      }}>
        {isLoading ? <Loading /> :
          <FlatList
            data={data}
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
              <Image
                style={{ width: 320, height: 150, marginBottom: 12 }}
                source={{ uri: location?.image_url || DEFAULT_IMAGE_URL }}
                resizeMode='contain'
              />
              <SectionContent padding={0} style={{ flex: 1 }}>
                <SectionContent
                  style={styles.locationDetails}
                >
                  <Text style={{ fontSize: 24, marginRight: 8, fontWeight: 'bold' }}>{location?.name}</Text>
                  <StarRatingDisplay
                    starSize={25}
                    rating={getLocationAverageRating(data || [])}
                    starStyle={{ marginHorizontal: 0 }} />
                </SectionContent>

                <SectionContent style={{ paddingVertical: 5 }}>
                  <Text>{`${location.city}/${location.state}`}</Text>
                  {(location.openning_hour && location.closing_hour)
                    && <Text style={{ marginTop: 8 }}>{isOpen(location) ? 'Aberto' : 'Fechado'}</Text>}
                </SectionContent>

                <SectionContent padding={0} style={{ marginVertical: 10, height: 1, backgroundColor: '#A19E9E' }} />
              </SectionContent>

            </>}
            showsVerticalScrollIndicator={false}
          />}
      </Section>
    </Layout>

  )
}

const styles = StyleSheet.create({
  locationDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5
  }
})

// eslint-disable-next-line max-len
const DEFAULT_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/No_Image_%282879926%29_-_The_Noun_Project.svg/240px-No_Image_%282879926%29_-_The_Noun_Project.svg.png'