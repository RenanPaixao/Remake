import React from 'react'
import { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MainStackParamList } from '../../types/navigation'
import Accordion from './Accordion'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, TopNav, Section, SectionContent, Text } from 'react-native-rapi-ui';
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    margin: 35,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
  response:{
    width: 320,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
    marginVertical: 5,
    marginHorizontal:35,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
});

const supabase = createClient('https://izgjtgdyvjzrsyxtabfx.supabase.co/functions/v1/material-type', 'public-anon-key')


export default function Faq({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {

  const [searchText, setSearchText] = useState('');

  // Função para atualizar o estado do input
  const handleInputChange = (text) => {
    setSearchText(text);
  };


  const handleInputSubmit = async () => {
    console.log('Texto inserido:', searchText);

    const { data, error } = await supabase.functions.invoke('material-type', {
    body: JSON.stringify({ 'product': searchText })
    ,});

    console.log('Resposta:', data);
  
    };

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
      </View>
      <View style={styles.response}>

      </View>
      <View style={{ flex: 1, padding: 25 }}>
        {faqData.map((item, index) => (
          <Accordion key={index} title={item.title} content={item.content} />
        ))}
      </View>
    </Layout>
  )
  
}
