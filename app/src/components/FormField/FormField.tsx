import { Text, TextInput, themeColor } from 'react-native-rapi-ui'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputProps } from 'react-native'

interface FormFieldProps {
  label: string
  name: string
  value: string
  setFieldValue: (name: string, value: string) => void
  validateField: (name: string) => void
  error?: any
  containerStyle?: object
  placeholder?: string
}
export const FormField = (
  {
    label,
    name,
    value,
    setFieldValue,
    validateField,
    error,
    containerStyle,
    placeholder,
    ...rest
  }: TextInputProps & FormFieldProps) => {
  const styles = StyleSheet.create({
    input: {
      borderColor: error ? themeColor.danger : undefined
    },
    errorMessage: {
      opacity: error ? 1 : 0,
      color: themeColor.danger
    }
  })

  return (
    <View style={containerStyle}>
      <Text >{label}</Text>
      <TextInput
        borderColor={styles.input.borderColor}
        onChangeText={text => {setFieldValue(name, text) }}
        placeholder={placeholder}
        onBlur={() => {validateField(name) }}
        onKeyPress={() => {
          validateField(name)
        }}
        value={value}
        {...rest}
      />
      {<Text style={styles.errorMessage}>{error}</Text>}
    </View>
  )
}

