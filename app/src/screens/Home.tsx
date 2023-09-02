import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TouchableOpacity } from 'react-native'
import { MainStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, TopNav, Section, SectionContent } from 'react-native-rapi-ui'
import '../utils/i18n'
import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  buttonText: {
    color: 'gray',
    textDecorationLine: 'underline'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
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
)

export default function Home({
  navigation
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) {
  const { t, i18n } = useTranslation();

  const buttons = [
    t('Lixo Organico'),
    t('Lixo Reciclavel'),
    t('Lixo Eletronico'),
    t('Residuos Perigosos'),
    t('Lixo não reciclável')
  ]

  return (
    <Layout>
      <TopNav middleContent= {t('Tela inicial')} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Section style={{ marginTop: -30 }}>
          <SectionContent>
            <View>
              <Text style={styles.title}>
                {t('Escolha a categoria que deseja descartar')}
              </Text>
            </View>

            {/* List Button */}
            <CustomButton
              text={t('Veja os locais mais próximos à sua localização!')}
              onPress={() => navigation.navigate('Companies')}
            />

            {/* Buttons */}
            {buttons.map((button, index) => (
              <Button
                color='#6E8963'
                key={index}
                text={button}
                onPress={() => navigation.navigate('Companies')}
                style={{ marginTop: 20 }}
              />
            ))}

            {/* FAQ Button */}
            <CustomButton
              text={t('Qualquer dúvida acesse nosso FAQ!')}
              onPress={() => navigation.navigate('Faq')}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  )
}
