import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { MainStackParamList } from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Layout, TopNav, Section, SectionContent } from 'react-native-rapi-ui';

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'gray',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  Button:{
    
  }
});

type CustomButtonProps = {
  text: string;
  onPress: () => void;
};

//link button component
const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default function Home({
  navigation,
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  const buttons = [
    'Lixo Organico' ,
    'Lixo Reciclavel' ,
    'Lixo Eletronico' ,
    'Residuos Perigosos' ,
    'Lixo não reciclável',
  ];

  return (
    <Layout>
      <TopNav middleContent="Home" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Section style={{ marginTop:-30}}>
          <SectionContent>
            <View>
              <Text style={styles.title}>
                Escolha a categoria que deseja descartar
              </Text>
            </View>

            {/* List Button */}
            <CustomButton
              text="Veja os locais mais próximos à sua localização!"
              onPress={() => navigation.navigate('Companies')}
            />

            {/* Buttons */}
            {buttons.map((button, index) => (
              <Button
              color='#6E8963'
                key={index}
                text={button}
                onPress={() => navigation.navigate('Companies')}
                style={{marginTop: 20}}
              />
            ))}

            {/* FAQ Button */}
            <CustomButton
              text="Qualquer dúvida acesse nosso FAQ!"
              onPress={() => navigation.navigate('Faq')}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}