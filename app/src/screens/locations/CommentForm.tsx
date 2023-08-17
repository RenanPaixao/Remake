import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { TextInput, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Layout, Section, SectionContent, Text, TopNav, themeColor } from 'react-native-rapi-ui'
import { MainStackParamList } from '../../types/navigation'
import StarRating from 'react-native-star-rating-widget'
import { supabase } from '../../initSupabase'
import { CommentsService } from '../../services/comments/commentsService'

interface ICommentFormProps extends NativeStackScreenProps<MainStackParamList, 'CommentForm'> {
}
export default function CommentForm({ navigation, route }: ICommentFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const locationId = route.params || ''
  const userId = supabase.auth.user()?.id || ''

  const handleSubmit = async() => {
    try {
      if (!rating || !comment) {
        Alert.alert('', 'Preencha todos campos da avaliação')
        return
      }

      setSubmitLoading(true)
      await CommentsService.createComment({ userId, locationId, avaliation: rating, comment })
      Alert.alert('', 'Sua avaliação foi enviada!', [
        { text: 'OK', onPress: () => {navigation.pop()} }
      ])
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <Layout style={{ flex: 1 }} >
      <TopNav
        middleContent='Avaliação'
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
      <Section>
        <SectionContent>
          <View style={{ marginBottom: 10 }}>
            <Text size='xl' fontWeight='bold'>Como você classificaria esse local?</Text>
            <StarRating style={{ marginVertical: 5 }} starSize={36} rating={rating} onChange={setRating}/>
          </View>

          <View>
            <Text size='xl' fontWeight='bold'>Escreva sua avaliação:</Text>
            <TextInput style={{ backgroundColor: themeColor.white,
              borderColor: '#d8d8d8',
              color: themeColor.black,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              fontSize: 18,
              marginBottom: 20,
              marginTop: 10
            }}
            value={comment}
            onChangeText={setComment}
            spellCheck multiline textAlignVertical='top' numberOfLines={5} placeholder={message} />
          </View>
          <TouchableOpacity
            disabled={submitLoading}
            style={{
              backgroundColor: submitLoading ? '#6e896373': '#6E8963',
              height: 45,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8 }}
            onPress={handleSubmit}
          >
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginRight: 20 }}>Avaliar</Text>
            {submitLoading && <ActivityIndicator size="large" color="white" />}
          </TouchableOpacity>
        </SectionContent>
      </Section>
    </Layout>
  )
}


const message = 'Qual sua avaliação do local? Do que você gostou ou não gostou?'