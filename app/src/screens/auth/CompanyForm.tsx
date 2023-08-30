import React from 'react'
import { FormikProps } from 'formik'
import * as Yup from 'yup'
import { FormField } from '../../components/FormField/FormField'
import '../../utils/i18n'
import { useTranslation } from 'react-i18next'

const { t, i18n } = useTranslation()
const fieldNames = {
  companyName: 'companyName',
  cep: 'cep',
  number: 'number',
  complement: 'complement',
  district: 'district',
  city: 'city',
  state: 'state',
  street: 'street',
  openingHour: 'openingHour',
  closingHour: 'closingHour',
  latitude: 'latitude',
  longitude: 'longitude'
}

const errorMessages = {
  required: 'Obrigatório!',
  invalidCep: 'Cep inválido!',
  invalidNumber: 'Apenas números são permitidos!',
  invalidOpeningHour: 'Formato inválido! O formato aceito é 09:00 (HH:MM)'
}

const companyFormSchema = Yup.object({
  companyName: Yup.string().required(errorMessages.required),
  cep: Yup.string().required(errorMessages.required)
    .matches(/\d{2}[.\s]?\d{3}[-.\s]?\d{3}$/, errorMessages.invalidCep),
  number: Yup.string().required(errorMessages.required).matches(/^[0-9]+$/, errorMessages.invalidNumber),
  complement: Yup.string(),
  district: Yup.string().required(errorMessages.required),
  city: Yup.string().required(errorMessages.required),
  state: Yup.string().required(errorMessages.required),
  street: Yup.string().required(errorMessages.required),
  openingHour: Yup.string().required(errorMessages.required)
    .matches(/[0-9]{2}:[0-9]{2}$/, errorMessages.invalidOpeningHour),
  closingHour: Yup.string().required(errorMessages.required)
    .matches(/[0-9]{2}:[0-9]{2}/, errorMessages.invalidOpeningHour),
  latitude: Yup.string().required(errorMessages.required),
  longitude: Yup.string().required(errorMessages.required)
})

type InitialCompanyFormValues = Yup.InferType<typeof companyFormSchema> & {
  complement: string
}

const CompanyForm = (props: FormikProps<InitialCompanyFormValues> & { loading?: boolean }) => {
  
  return (<>
    <FormField
      label={t("Nome da empresa (*)")}
      name={fieldNames.companyName}
      value={props.values.companyName}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      loading={props.loading}
      error={props.errors.companyName}
      containerStyle={{ marginTop: 15 }}
      placeholder={t('Insira o nome da empresa. Pode ser seu nome')}
    />

    <FormField
      label={'CEP (*)'}
      name={fieldNames.cep}
      value={props.values.cep}
      loading={props.loading}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.cep}
      containerStyle={{ marginTop: 15 }}
      placeholder={t('Insira o CEP do seu principal ponto de coleta')}
    />

    <FormField
      label={t('Estado (*)')}
      name={fieldNames.state}
      loading={props.loading}
      value={props.values.state}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.state}
      containerStyle={{ marginTop: 15 }}
      placeholder={t('Estado')}
    />

    <FormField
      label={t('Cidade (*)')}
      name={fieldNames.city}
      loading={props.loading}
      value={props.values.city}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.city}
      containerStyle={{ marginTop: 15 }}
      placeholder={t('Cidade')}
    />

    <FormField
      label={t('Bairro (*)')}
      name={fieldNames.district}
      loading={props.loading}
      value={props.values.district}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.district}
      containerStyle={{ marginTop: 15 }}
      placeholder={t('Bairro')}
    />

    <FormField
      label={t('Nome da rua (*)')}
      name={fieldNames.street}
      loading={props.loading}
      value={props.values.street}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.street}
      containerStyle={{ marginTop: 15 }}
      placeholder={t('Rua')}
    />

    <FormField
      label={t('Número (*)')}
      name={fieldNames.number}
      loading={props.loading}
      value={props.values.number}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.number}
      containerStyle={{ marginTop: 15 }}
      placeholder={t('Número')}
    />

    <FormField
      label={t('Complemento')}
      name={fieldNames.complement}
      loading={props.loading}
      value={props.values.complement}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.complement}
      containerStyle={{ marginTop: 15 }}
      placeholder={t('Complemento')}
      multiline={true}
    />

    <FormField
      label={'Latitude (*)'}
      name={fieldNames.latitude}
      loading={props.loading}
      value={props.values.latitude.toString()}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.latitude}
      containerStyle={{ marginTop: 15 }}
      placeholder={'0.00'}
    />

    <FormField
      label={'Longitude (*)'}
      name={fieldNames.longitude}
      loading={props.loading}
      value={props.values.longitude.toString()}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.longitude}
      containerStyle={{ marginTop: 15 }}
      placeholder={'0.00'}
    />

    <FormField
      label={t('Aberto às (*)')}
      name={fieldNames.openingHour}
      loading={props.loading}
      value={props.values.openingHour}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.openingHour}
      containerStyle={{ marginTop: 15 }}
      placeholder={'00:00'}
    />

    <FormField
      label={t('Fechado às (*)')}
      name={fieldNames.closingHour}
      loading={props.loading}
      value={props.values.closingHour}
      setFieldValue={props.setFieldValue}
      validateField={props.validateField}
      error={props.errors.closingHour}
      containerStyle={{ marginTop: 15 }}
      placeholder={'00:00'}
    />
  </>)
}

export { CompanyForm, InitialCompanyFormValues, companyFormSchema }
