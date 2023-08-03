import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { Button, Layout, Section, SectionContent, Text, TopNav, themeColor } from 'react-native-rapi-ui'
import { MainStackParamList } from '../../types/navigation'
import StarRating from 'react-native-star-rating-widget'
import { supabase } from '../../initSupabase'
import { useQuery } from '@tanstack/react-query'
import { CommentsService } from '../../services/comments/commentsService'

interface ICommentFormProps extends NativeStackScreenProps<MainStackParamList, 'CommentForm'> {
}
export default function CommentForm({ navigation, route }: ICommentFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const locationId = route.params || ''
  const userId = supabase.auth.user()?.id || ''

  //   useQuery({
  //     queryKey: ['comment_create', { userId, locationId, avaliation: rating, comment }],
  //     enabled: false,
  //     queryFn: () => CommentsService.createComment({ userId, locationId, avaliation: rating, comment })
  //   })

  return (
    <Layout style={{ flex: 1 }} >
      <TopNav
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <Section>
        <SectionContent>
          <View>
            <Text fontWeight='bold'>Como você classificaria esse local?</Text>
            <StarRating rating={rating} onChange={setRating} />

          </View>

          <View>
            <Text fontWeight='bold'>Escreva sua avaliação:</Text>

            <TextInput style={{ backgroundColor: themeColor.white,
              borderColor: '#d8d8d8',
              color: themeColor.black,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              fontSize: 18
            }}
            value={comment}
            onChangeText={setComment}
            spellCheck multiline textAlignVertical='top' numberOfLines={5} placeholder={message} />
          </View>
          <Button text='enviars' color={themeColor.success700}
            onPress={() => CommentsService.createComment({ userId, locationId, avaliation: rating, comment })}/>
        </SectionContent>
      </Section>
    </Layout>
  )
}

const message = 'Qual sua avaliação do local? Do que você gostou ou não gostou?'