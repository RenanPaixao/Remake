import { Text, TextInput, themeColor } from 'react-native-rapi-ui'
import React from 'react'
import { StyleSheet, View, TextInputProps } from 'react-native'
import Loading from '../../screens/utils/Loading'

interface FormFieldProps {
  label: string
  name: string
  value: string
  setFieldValue: (name: string, value: string) => void
  validateField: (name: string) => void
  error?: any
  containerStyle?: object
  placeholder?: string
  loading?: boolean
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
    loading,
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
    <View
      style={[containerStyle, { opacity: loading ? 0.5 : 1 }]}
      pointerEvents={loading ? 'none' : 'auto'}
    >
      <Text style={{ marginBottom: 5 }}>{label}</Text>
      <TextInput
        editable={!loading}
        selectTextOnFocus={!loading}
        contextMenuHidden={loading}
        leftContent={loading && <Loading />}
        borderColor={styles.input.borderColor}
        onChangeText={text => {
          setFieldValue(name, text)
        }}
        placeholder={placeholder}
        onBlur={() => {
          validateField(name)
        }}
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

