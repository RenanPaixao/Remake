import { supabase } from '../../initSupabase'

export interface MaterialServiceResponse {
  nome: string
  categoria: string
  justificativa: string
  message?: string
}

export interface MaterialServiceInput {
  product: string
}

class MaterialService {
  async materialType(inputText: string):Promise<MaterialServiceResponse> {
    // eslint-disable-next-line
    const { data, error } = await supabase.functions.invoke('material-type', {
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ 'product': inputText })
    })

    return data
  }

} export const GptService = new MaterialService()
