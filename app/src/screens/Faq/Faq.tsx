import React, { useEffect } from 'react'
import { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MainStackParamList } from '../../types/navigation'
import Accordion from './Accordion'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Layout, TopNav, Text } from 'react-native-rapi-ui';
import { createClient } from '@supabase/supabase-js'

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

const apiURL = process.env.MATERIALTYPE_PUBLIC_API_URL;
const apiKey = process.env.MATERIALTYPE_PUBLIC_API_KEY;

export const supabase = createClient(apiURL as string, apiKey as string, {
  detectSessionInUrl: false,
  autoRefreshToken: true
});

let response = "";

export default function Faq({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {

  const [searchText, setSearchText] = useState('');

  const handleInputChange = (text) => {
    setSearchText(text);
  };

  const handleDataReceived = (jsonData: string) => {
    const parsedData = JSON.parse(jsonData);
    setData(parsedData);
  };

  const handleInputSubmit = async () => {

    const { data, error } = await supabase.functions.invoke('material-type', {
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ 'product': searchText })
      ,
    });
    response = data;
    setResponse(data);

  };

  useEffect(() => { }, [response]);



  return (

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
          onChangeText={handleInputChange}
          onSubmitEditing={handleInputSubmit}
        />
        <View style={styles.response}>
          {response && (
            <Text style={styles.responseText}>
              {response.message ? response.message : (
                <View>
                  {response.categoria}, {response.justificativa}
                </View>
              )}
            </Text>
          )}
          {!response && <Text style={styles.input}>Tire sua dúvida sobre o material a ser reciclado...</Text>}
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
  )

}
