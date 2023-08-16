import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { MainStackParamList } from '../../types/navigation';
import Accordion from './AccordionProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, TopNav, Text } from 'react-native-rapi-ui';
import TypeWriter from './TypeWritter';
import { GptService, MaterialServiceResponse } from '../../services/supabase/materialTypeService';

const faqData = [
  {
    title: 'Como posso criar um local de reciclagem?',
    content: 'A criação pode ser realizada pelo cadastro onde o criador vai ter uma conta especifica para realizar o gerenciamento da conta e das informações do local e do reciclador...',
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

export default function Faq({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  // State variables
  const [searchText, setSearchText] = useState('');
  const [response, setResponse] = useState<MaterialServiceResponse>({} as MaterialServiceResponse);

  // Handle input submission
  const handleInputSubmit = async () => {
    setResponse(await GptService.materialType(searchText));
  };

  // Empty useEffect for potential future use
  useEffect(() => { }, [response]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Top navigation */}
        <TopNav middleContent="FAQ" />

        {/* Title */}
        <Text style={styles.title}>
          Qual objeto você tem dúvida se é reciclável?
        </Text>

        {/* Input Container */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar categoria"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleInputSubmit}
          />
        </View>

        {/* Response */}
        <View style={styles.response}>
          {(response.message || response.categoria) ? (
            <Text style={styles.responseText}>
              {response.message ? response.message : (
                <Text style={styles.responseText}>
                  <TypeWriter text={`${response.categoria}, ${response.justificativa}`} />
                </Text>
              )}
            </Text>
          ) : (
            <Text style={styles.input}>Tire sua dúvida sobre o material a ser reciclado...</Text>
          )}
        </View>

        {/* FAQ section */}
        <Text style={styles.title}>Perguntas Frequentes</Text>
        <View style={{ flex: 1, padding: 25 }}>
          {faqData.map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
