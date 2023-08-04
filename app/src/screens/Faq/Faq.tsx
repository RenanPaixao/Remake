import React, { useEffect } from 'react'
import { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { MainStackParamList } from '../../types/navigation'
import Accordion from './Accordion'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Layout, TopNav, Text } from 'react-native-rapi-ui';
import { GptService, MaterialServiceResponse } from '../../services/supabase/materialTypeService'

const faqData = [
  {
    title: 'Como posso criar um local de reciclagem?',
    content: 'A criação pode ser realizada pelo cadastro onde o criador vai ter uma consta especifica para realizar o gerenciamento da conta e das informações do local e do reciclador...',
  },
  {
    title: 'O que é reciclagem?',
    content: 'Reciclagem é o processo de transformar materiais descartados...',
  },
  {
    title: 'Como separar o lixo para reciclagem?',
    content: 'Para separar o lixo para reciclagem, é importante seguir algumas dicas...',
  }
];

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    margin: 35,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    color: 'gray',
    margin: 10,
  },
  response: {
    width: 320,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
    marginVertical: 5,
    marginHorizontal: 35,
  },
  responseText: {
    fontSize: 12,
    color: 'black',
    margin: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
});

let response = {};

export default function Faq({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {

  const [searchText, setSearchText] = useState('');
  const [response, setResponse] = useState<MaterialServiceResponse>({} as MaterialServiceResponse);

  useEffect(() => { }, [response]);

  const handleInputSubmit = async () => {
    setResponse(await GptService.materialType(searchText));

  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout>
        <TopNav middleContent="FAQ" />
        <Text style={styles.title}>
          Qual objeto você tem dúvida se é reciclável?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar categoria"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleInputSubmit}>
          </TextInput>
        </View>
        <View style={styles.response}>
          {(response.message || response.categoria) && (
            <Text style={styles.responseText}>
              {response.message ? response.message : (
                <Text style={styles.responseText}>
                  {response.categoria}, {response.justificativa}
                </Text>
              )}
            </Text>
          )}
          {(!response.message && !response.categoria) && <Text style={styles.input}>Tire sua dúvida sobre o material a ser reciclado...</Text>}
        </View>
        <Text style={styles.title}>
          Perguntas Frequentes
        </Text>
        <View style={{ flex: 1, padding: 25 }}>
          {faqData.map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </View>
      </Layout>
    </ScrollView>
  )

}
