import axios from 'axios'

interface Cep{
  cep: string,
  city: string,
  location: {
      coordinates: {
        latitude: number
        longitude: number
      },
    type: string
  },
  neighborhood: string,
  service: string,
  'state': string,
  street: string
}

class BrasilApiService {
  cepEndpoint = 'cep/v2/'

  constructor(private apiInstance = axios.create({
    baseURL: 'https://brasilapi.com.br/api/',
    timeout: 3000,
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  })) {}
  async getCep(cep: string): Promise<Cep> {
    const { data } = await this.apiInstance.get(`${this.cepEndpoint}${cep}`)

    return data
  }
}

export const BrasilService = new BrasilApiService()
