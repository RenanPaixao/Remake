import { supabase } from '../../initSupabase'

export interface LocationCoordinates {
  latitude: number
  longitude: number
}

export interface LocationWithoutCoordinates {
  id?: string
  created_at?: string
  cep: string
  name: string
  state: string
  number: number
  complement?: string
  city: string
  district: string
  company_id: string
  openning_hour?: string
  closing_hour?: string
}

export type Location = LocationWithoutCoordinates & LocationCoordinates
export class LocationsService {
  static queryBuilder = supabase.from('locations')

  static async create(location: Location) {
    const { data, error } = await LocationsService.queryBuilder.insert(location).single()

    if (error) {
      throw error
    }

    return data
  }
  static async delete(id: string) {
    await LocationsService.queryBuilder.delete().eq('id', id).throwOnError()
  }
}
