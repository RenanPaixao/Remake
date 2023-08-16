import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView,  ActivityIndicator } from 'react-native';
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
  },
  {
    title: 'Porque é importante descartar o lixo corretamente?',
    content: 'descartar o lixo de maneira adequada é uma responsabilidade coletiva que contribui para a saúde humana, a proteção ambiental e a sustentabilidade global...',
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
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: 'black',
    margin: 10,
  },
  input2: {
    fontSize: 16,
    color: 'gray',
    margin: 10,
  },
  response: {
    width: 320,
    height: 140,
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
    marginVertical: 5,
    marginHorizontal: 35,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  responseText: {
    fontSize: 14,
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
  const [loading, setLoading] = useState(false);

  // Handle input submission
  const handleInputSubmit = async () => {
    setLoading(true);
    setResponse(await GptService.materialType(searchText));
    setLoading(false);
  };

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
        {loading ? (
          <View style={styles.indicator}><ActivityIndicator size="large" color='#6E8963'/></View>
        ) : (
          response.message || response.categoria ? (
            <Text style={styles.responseText}>
              {response.message ? response.message : (
                <Text style={styles.responseText}>
                  <TypeWriter text={`${response.categoria}, ${response.justificativa}`} />
                </Text>
              )}
            </Text>
          ) : (
            <Text style={styles.input2}>Tire sua dúvida sobre o material a ser reciclado...</Text>
          )
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
