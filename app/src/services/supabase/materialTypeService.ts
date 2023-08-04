import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://izgjtgdyvjzrsyxtabfx.supabase.co/functions/v1/material-type', 'public-anon-key')

export interface MaterialServiceResponse {
  nome: string
  categoria: string
  justificativa: string
  message?: string
}

export interface MaterialServiceInput {
  product: string
}

class MaterialService{
  async materialType (inputText: string):Promise<MaterialServiceResponse>{
    const { data, error } = await supabase.functions.invoke('material-type', {
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ 'product': inputText }),
    });
  
    const dataString = data;  
    return dataString;
  };
  
 } export const GptService = new MaterialService()
  