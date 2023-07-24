import { supabase } from '../../initSupabase'



export class CompaniesService {
  static queryBuilder = supabase.from('companies')

  static async getAllWithLocations() {
    const { data } = await CompaniesService.queryBuilder.select('*, locations(*)').throwOnError()

    if(data === null) return []

    return data.filter(company => company.locations.length)
  }
}
