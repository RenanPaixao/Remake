import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView } from 'react-native'
import { MainStackParamList } from '../../types/navigation'
import Accordion from './AccordionProps'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Layout, TopNav, Text, themeColor } from 'react-native-rapi-ui'
import { GptService, MaterialServiceResponse } from '../../services/supabase/materialTypeService'
import { Ionicons } from '@expo/vector-icons'
import Loading from '../utils/Loading'

const faqData = [
  {
    title: 'Como posso criar um local de reciclagem?',
    //eslint-disable-next-line
    content: 'A criação pode ser realizada pelo cadastro onde o criador vai ter uma conta especifica para realizar o gerenciamento da conta e das informações do local e do reciclador...'
  },
  {
    title: 'O que é reciclagem?',
    content: 'Reciclagem é o processo de transformar materiais descartados...'
  },
  {
    title: 'Como separar o lixo para reciclagem?',
    content: 'Para separar o lixo para reciclagem, é importante seguir algumas dicas...'
  }
]

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    margin: 35,
    marginBottom: 20,
    marginTop: 20
  },
  input: {
    fontSize: 16,
    margin: 10
  },
  responseText: {
    fontSize: 12,
    margin: 4
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40
  }
})

export default function Faq({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  // State variables
  const [searchText, setSearchText] = useState('')
  const [response, setResponse] = useState<MaterialServiceResponse>({} as MaterialServiceResponse)
  const [isLoading, setIsLoading] = useState(false)

  // Handle input submission
  const handleInputSubmit = async () => {
    setIsLoading(true)
    setResponse(await GptService.materialType(searchText))
    setIsLoading(false)
  }

  // Empty useEffect for potential future use
  useEffect(() => { }, [response])

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Top navigation */}
        <TopNav
          middleContent="FAQ"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={themeColor.dark}
            />
          }
          leftAction={() => navigation.goBack()}
        />

        {/* Title */}
        <Text style={styles.title}>
          Qual objeto você tem dúvida se é reciclável?
        </Text>

        {/* Input Container */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar categoria ou objeto"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleInputSubmit}
            onBlur={handleInputSubmit}
          />
        </View>

        <View style={styles.inputContainer}>
          {(response.message || response.categoria) ? (
            <Text style={styles.responseText}>
              {response.message ? response.message : (
                <Text style={styles.responseText}>
                  {response.categoria}, {response.justificativa}
                </Text>
              )}
            </Text>
          ) : (
            isLoading ?
              <Loading/> :
              <Text style={styles.input}>Sua resposta aparecerá aqui!</Text>
          )}
        </View>

        {/* Response */}

        {/* FAQ section */}
        <Text style={styles.title}>Perguntas Frequentes</Text>
        <View style={{ flex: 1, padding: 25 }}>
          {faqData.map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </View>
      </ScrollView>
    </Layout>
  )
}
