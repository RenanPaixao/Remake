import React from 'react'
import { FormikProps } from 'formik'
import * as Yup from 'yup'
import { Text } from 'react-native-rapi-ui'
import { FormField } from '../../components/FormField/FormField'

const fieldNames = {
  companyName: 'companyName',
  cep: 'cep',
  number: 'number',
  complement: 'complement',
  district: 'district',
  city: 'city',
  state: 'state',
  street: 'street'
}

const errorMessages = {
  required: 'Obrigatório!',
  invalidCep: 'Cep inválido!',
  invalidNumber: 'Apenas números são permitidos!'
}

const companyFormSchema = Yup.object({
  companyName: Yup.string().required(errorMessages.required),
  cep: Yup.string().required(errorMessages.required)
    .matches(/\d{3}[.\s]?\d{3}[.\s]?\d{3}[-.\s]?\d{2}/, errorMessages.invalidCep),
  number: Yup.string().required(errorMessages.required).matches(/^[0-9]+$/, errorMessages.invalidNumber),
  complement: Yup.string(),
  district: Yup.string().required(errorMessages.required),
  city: Yup.string().required(errorMessages.required),
  state: Yup.string().required(errorMessages.required),
  street: Yup.string().required(errorMessages.required)
})

type InitialCompanyFormValues = Yup.InferType<typeof companyFormSchema> & {
  complement: string
}

const CompanyForm = (props: FormikProps<InitialCompanyFormValues> ) => {
  return (<>
    <FormField
      label={'Nome da empresa*'}
      name={fieldNames.companyName}
      value={props.values.companyName}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.companyName}
      containerStyle={{ marginTop: 15 }}
      placeholder={'Insira o nome da empresa. Pode ser seu nome'}
    />

    <FormField
      label={'CEP*'}
      name={fieldNames.cep}
      value={props.values.cep}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.cep}
      containerStyle={{ marginTop: 15 }}
      placeholder={'Insira o CEP do seu principal ponto de coleta'}
    />

    <FormField
      label={'Estado*'}
      name={fieldNames.state}
      value={props.values.state}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.state}
      containerStyle={{ marginTop: 15 }}
      placeholder={'Estado'}
    />

    <FormField
      label={'Cidade*'}
      name={fieldNames.city}
      value={props.values.city}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.city}
      containerStyle={{ marginTop: 15 }}
      placeholder={'Cidade'}
    />

    <FormField
      label={'Bairro*'}
      name={fieldNames.district}
      value={props.values.district}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.district}
      containerStyle={{ marginTop: 15 }}
      placeholder={'Bairro'}
    />

    <FormField
      label={'Nome da rua*'}
      name={fieldNames.street}
      value={props.values.street}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.street}
      containerStyle={{ marginTop: 15 }}
      placeholder={'Rua'}
    />

    <FormField
      label={'Número*'}
      name={fieldNames.number}
      value={props.values.number}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.number}
      containerStyle={{ marginTop: 15 }}
      placeholder={'Número'}
    />

    <FormField
      label={'Complemento'}
      name={fieldNames.complement}
      value={props.values.complement}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.complement}
      containerStyle={{ marginTop: 15 }}
      placeholder={'Complemento'}
      multiline={true}
    />
    <Text style={{ marginTop: 15 }}>{props.errors && JSON.stringify(props.errors)}</Text>
    <Text style={{ marginTop: 15 }}>{JSON.stringify(props.values)}</Text>
  </>)
}

export { CompanyForm, InitialCompanyFormValues, companyFormSchema }